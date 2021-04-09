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
    showList(_areas[tab]);
}

function showList(list) {

    $('.ranking-item').html('');
    for (var i = 0; i < list.length; i++) {
        var addr = list[i];
        var player = _players[addr];
        var ranking = i + 1;
        var id = player.id;
        var addr = player.addr;
        var voteCount = player.count;
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
    var _balance = 0;

    await pccInstance.methods.balanceOf(defaultAccount).call().then(balance => {
        _balance = balance;
    }).catch(err => {
        console.log(err);
        return;
    });
    console.log(_balance, total);
    if (_balance < total) {
        alertify.error(tipl[34]);
        return;
    }
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


    var checkNet = function() {
        if (isStart) {
            return
        }
        console.log("init web3...");

        if (window.ethereum) {
            let ethereum = window.ethereum
            web3 = window.web3 = new Web3(ethereum);
            try {
                isStart = true;

                ethereum.enable();
                handlerWeb3(window.web3)
            } catch (error) {}
        } else {
            if (window.web3) {
                web3 = window.web3 = new Web3(web3.currentProvider);
                isStart = true;
                handlerWeb3(window.web3)
            } else {
                alertify.error(tipl[2])
            }
        }
    };
    var handlerWeb3 = function(web3) {

        dividendsInstance = new web3.eth.Contract(dividendsAbi, dividendsAddress);

        pccInstance = new web3.eth.Contract(pccAbi, pccAddress);

        voteInstance = new web3.eth.Contract(voteAbi, voteAddress);


        web3.eth.net.getId(function(err, netId) {
            if (netId != gnetId) {
                if (gnetId == 3 || gnetId == 4) {
                    alertify.error(tipl[0])
                }
                if (gnetId == 1) {
                    alertify.error(tipl[1])
                }
            } else {
                netCheck = true;
                checkLogin()
            }
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

        web3.eth.getAccounts(function(err, accounts) {
            if (err) {
                alertify.error(err);
                return;
            }
            if (accounts.length == 0) {
                alertify.error(tipl[3]);
                return;
            }
            defaultAccount = accounts[0];
        })
    };

    checkNet();

    setInterval(function() {

        checkNet();
    }, 3000);

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

        var p1 = await initBigPPCount();

        await checkFusingState();

        if (!fusing) {
            return;
        }

        await initUsers();


        await matchingVote();



        await sortVote();


        await changeTab(1);
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
        await voteInstance.methods.getVoteInfo(bppNum, fuseTime, addresses).call().then(async arr => {
            for (var i in addresses) {
                var addr = addresses[i];
                var count = arr[i];
                _players[addr].count = count;
            }
        }).catch(err => {
            console.log(err);
            return;
        });
    }


    async function initBigPPCount() {
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