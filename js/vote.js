var dividendsInstance;
var voteInstance;

var pccInstance;
var _areas = {
    1: [],
    2: [],
    3: [],
    4: []
};
var _players = {};
var web3 = window.web3;
var language = store.get("language");
var isStart = false;
var userCount = 0;
var progress = 0;
var BN = BigNumber.clone();
var fusing = false;
var fuseTime = 0;
var defaultAccount = "";
var bppNum;
var pccBase = 10 ** 18;
var curTab = 1;
var tipl;

function changeTab(tab) {
    $("#addr").val('');
    curTab = tab;
    showList(_areas[tab],[]);
    // $.ajax({
    //     type: 'get',
    //     dataType: 'json',
    //     crossDomain: true,
    //     url: url + "/admin/vote/statics?vipNow="+tab,
    //     headers: {
    //
    //     },
    //     success: function(result) {
    //         if (result != null && result != undefined) {
    //             showList(_areas[tab],result.data);
    //         }
    //     },
    //     error: function(data) {
    //         // alertify.error("未知错误");
    //     }
    // });

}



function showList(list,data) {

    $('.ranking-item').html('');
    for (var i = 0; i < list.length; i++) {
        var addr = list[i];
        var count=0;
        for(var j=0;j<data.length;j++){
            if(data[j].address==addr){
                count = data[j].num
            }
        }
        console.log(_players)
        var player = _players[addr];
        console.log(player)
        var ranking = i + 1;
        var id = player.id;
        var addr = player.addr;
        // var voteCount = player.count;
        var voteCount =count;
        var template = $("#template").children().clone();
        template.find(".num").html(ranking);
        template.find(".addr").html(addr);
        template.find(".addup-count").html(BN(voteCount / pccBase).toFixed(2));

        template.find(".form-control").attr("data", addr);
        template.show();
        $('.ranking-item').append(template);
    }
}

async function vote() {
    var addrArr = [];
    var countArr = [];
    $(".ranking").find(".count-input").children("input")
        .each((index, element) => {
            var count = parseInt(element.value);
            if (count && count > 0) {
                addrArr.push($(element).attr("data"));
                count = web3.utils.toWei(count + "", "ether");
                countArr.push(count + "");
            }
        });

    if (addrArr.length == 0) {
        alertify.error(tipl[45]);
        return;
    }


    var total = sum(countArr.map(Number));

    var canVote = false;
    await dividendsInstance.methods.getIdByAddr(defaultAccount).call().then(async id => {
        if (!id || id == 0) {
            return;
        }
        await dividendsInstance.methods.getPlayerById(id).call().then(async res => {
            var isOut = res[14];
            if (isOut == 0) {
                canVote = true;
            }
        }).catch(err => {
            console.log(err);
            return;
        });
    }).catch(err => {
        console.log(err);
        return;
    });

    if (!canVote) {
        alertify.error(tipl[46]);
        return;
    }
    console.log("addrArr: ", addrArr);
    console.log("countArr: ", countArr);
    pccInstance.methods.allowance(defaultAccount, voteAddress).call().then(async res => {
        if (res > 0) {
            await pccInstance.methods.approve(voteAddress, 0).send({
                from: defaultAccount
            }, function(err, res) {});
        }
        pccInstance.methods.approve(voteAddress, total + "").send({
            from: defaultAccount
        }).then(() => {
            voteInstance.methods.doVote(addrArr, countArr).send({
                from: defaultAccount
            }).then(res => {
                window.location.reload();
            }).catch(err => {
                console.log(err);
                return;
            });
        }).catch(err => {
            console.log(err);
        });
    });
}

function search() {
    var addr = $("#addr").val();
    var list = _areas[curTab];
    if (list.indexOf(addr) >= 0) {
        var arr = [addr];
        showList(arr);
    } else {
        showList([]);
    }

}

$(document).ready(function() {

    initLaguage();



    function getWeb3Version() {
        // console.info( web3 );
        // return false;
        if (!web3) return "0.0";
        console.log(11111)
        console.log(window.ethereum)
        return (typeof web3.version == "string") ? web3.version : web3.version.api;
    }
    var checkNet = function() {
        if (isStart) {
            return
        }
        // console.info("[web3]init:", getWeb3Version(), new Date().toISOString());
        // return false;
        if (!window.ethereum) {
            // fix for TokenPocket
            try {
                var str = sessionStorage.getItem("ethereum");
                window.ethereum = JSON.parse(str);
            } catch (error) {
                console.error("window.ethereum recover failed");
            }
        }
        if (window.ethereum) {
            try {
                // fix for TokenPocket
                sessionStorage.setItem("ethereum", JSON.stringify(window.ethereum));
            } catch (error) {
                console.info("window.ethereum save failed", error);
            }
            if (!web3 || getWeb3Version() < "1.0") {
                $.get('web3.min.js', function(res) {
                    console.info("[web3]ajax:", res.length + "byte", new Date().toISOString());
                    Web3 = window.Web3 = undefined;
                    // web3 = window.web3 = undefined;
                    setTimeout(() => {
                        eval(res);
                        window.web3 = web3 = new Web3(ethereum);
                        console.info("[web3]reload:", getWeb3Version(), new Date().toISOString());
                        handlerWeb3(window.web3);
                    }, 618);
                });
            } else {
                handlerWeb3(window.web3);
            }
        } else {
            if (window.web3) {
                console.info("[web3]currentProvider:", window.web3, web3.currentProvider);
                web3 = window.web3 = new Web3(web3.currentProvider);
                isStart = true;
                handlerWeb3(window.web3);
            } else {
                alertify.error(tipl[2]);
            }
        }
    };

    var handlerWeb3 = function(web3) {
        dividendsInstance = new web3.eth.Contract(dividendsAbi, dividendsAddress);
        pccInstance = new web3.eth.Contract(pccAbi, pccAddress);
        ticketsInstance = new web3.eth.Contract(ticketAbi, ticketAddress);
        usdtInstance = new web3.eth.Contract(usdtAbi, usdtAddress);
        voteInstance = new web3.eth.Contract(voteAbi, voteAddress);
        web3.eth.net.getId(function(err, netId) {
            netCheck = true;
            checkLogin()
            // if (netId != gnetId) {
            //     if (gnetId == 3 || gnetId == 4) {
            //         alertify.error(tipl[0])
            //     }
            //     if (gnetId == 1) {
            //         alertify.error(tipl[1])
            //     }
            // } else {

            //     checkLogin()
            // }
        })

    };


    var checkLogin = function() {
        setInterval(function() {
            web3.eth.getAccounts(function(err, acc) {
                if (err != null) {
                    console.log("error");
                    return;
                }
                if (acc.length == 0 && defaultAccount != "") {
                    window.location.reload();
                    return;
                }
                if (acc.length == 0) {
                    return;
                }
                if (acc[0] != defaultAccount) {
                    defaultAccount = acc[0];
                    window.location.reload();
                    console.log("account change, start bat updateData!")
                }
            })
        }, 1000);

        web3.eth.getAccounts(async function(err, accounts) {
            if (err) {
                alertify.error(err);
                return;
            }
            if (accounts.length == 0) {
                alertify.error(tipl[3]);
                return;
            }
            defaultAccount = accounts[0];
            console.log("defaultAccount: ", defaultAccount);

            if (defaultAccount != '') {

                var p1 = await initBigPPCount();

                await checkFusingState();

                if (!fusing) {
                    return;
                }

                await initUsers();


                await matchingVote();
                //
                //
                //
                await sortVote();
                //
                //
                await changeTab(1);
            }
        })
    };



    function activeProgress(progress) {
        $('.progress-bar').attr("style", "background:#d01d4c;width:" + progress + "%;");
        $('.progress-value').html(progress + "%");
        if (progress == 100) {
            setTimeout(function() {
                $('#loading').hide();
            }, 1500);
        }
    }

    async function init() {
        await checkNet();

    }


    async function matchingVote() {
        for (var i in _areas) {

            var addresses = _areas[i];


            await getVoteList(addresses);
        }

    }


    function sortVote() {
        for (var i in _areas) {
            var arr = _areas[i];
            sorting(arr);
        }
    }

    function sorting(arr) {
        var len = arr.length;
        var maxIndex, temp;
        for (var i = 0; i < len - 1; i++) {
            maxIndex = i;
            var addri = arr[i];
            var counti = _players[addri].count;
            for (var j = i + 1; j < len; j++) {
                var addrj = arr[j];
                var countj = _players[addrj].count;
                var addrMin = arr[maxIndex];
                var countMin = _players[addrMin].count;
                if (countj > countMin) {
                    maxIndex = j;
                }
            }
            temp = arr[i];
            arr[i] = arr[maxIndex];
            arr[maxIndex] = temp;
        }
    }

    async function checkFusingState() {
        await dividendsInstance.methods.getPrizePool(2, bppNum).call().then(bpp => {
            fuseTime = bpp[7];
            if (bpp.length > 0 && fuseTime > 0) {
                fusing = true;
                return;
            } else {
                $(".progress").hide();
                $(".fusing-error").removeClass('hidden');
            }
        }).catch(err => {
            console.log(err);
            return;
        });
    }


    async function getVoteList(addresses) {
        // await voteInstance.methods.getVoteInfo(bppNum, fuseTime, addresses).call().then(async arr => {
        //     console.log(arr)
        //     for (var i in addresses) {
        //         var addr = addresses[i];
        //         var count = arr[i];
        //         _players[addr].count = count;
        //     }
        // }).catch(err => {
        //     console.log(err);
        //     return;
        // });
    }


    async function initBigPPCount() {
        console.log(dividendsInstance);
        await dividendsInstance.methods.bigPrizePoolCount().call().then(num => {
            bppNum = num;
        }).catch(err => {
            console.log(err);
            return;
        });
        return bppNum;
    }


    async function initUsers() {
        return await dividendsInstance.methods._playerCount(bppNum).call().then(async count => {
            userCount = count;
            if (count > 0) {
                for (var i = 1; i <= count; i++) {
                    progress = BN(i / count * 100).toFixed(0);
                    activeProgress(progress);
                    await dividendsInstance.methods._playerMap(bppNum, i).call().then(player => {

                        var level = player.vipLevel;
                        if (level > 0 && level < 5) {
                            _areas[level].push(player.addr);
                            var value = {
                                id: player.id,
                                addr: player.addr,
                                count: 0,
                            };
                            var key = player.addr;
                            console.log(key);


                            _players[key] = value;
                        }
                    })
                }

            }
        }).catch(err => {
            console.log(err);
            return;
        });

    }


    init();
});
