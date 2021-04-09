$(document).ready(function() {
    var dividendsInstance;
    var ticketsInstance;
    var BN = BigNumber.clone();
    var netCheck = false;
    var symbol;
    var web3 = window.web3;
    var defaultAccount = "";
    var isStart = false;
    var language = store.get("language");
    var lan_arr;
    var tipl;
    var usdtBase = 1000000000000000000

    try {
        let r = new URLSearchParams(window.location.search).get('r');
        if (isNull(r)) {
            invitationAddress = "0x0000000000000000000000000000000000000000";
        } else {
            invitationAddress = r;
        }
    } catch (e) {

    }
    var initLaguage = function() {
        if (!language) {
            language = "language_us"
        }
        $("ul.language-menu > li").click(function() {
            store.set("language", "language_" + $(this).attr("data-value"));
            window.location.reload()
        });
        if (!language) {
            lan_arr = language_us;
            tipl = tipl_language_us
        } else {
            try {
                lan_arr = eval(language);
                tipl = eval("tipl_" + language)
            } catch (err) {
                lan_arr = language_us;
                tipl = tipl_language_us
            }
        }
        for (var i = 0; i < lan_arr.length; i++) {
            $(".lan-" + (i + 1)).html(lan_arr[i])
        }
    };
    initLaguage();

    var checkNet = function() {
        if (isStart) {
            return
        }
        console.log("init web3...");

        if (window.ethereum) {
            let ethereum = window.ethereum;
            web3 = window.web3 = new Web3(ethereum);
            try {
                isStart = true;

                ethereum.enable();
                handlerWeb3(window.web3);
            } catch (error) {}
        } else {
            if (window.web3) {
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
        ticketsInstance = new web3.eth.Contract(ticketAbi, ticketAddress);
        web3.eth.net.getId(function(err, netId) {
            netCheck = true;
            checkLogin()
           /* if (netId != gnetId) {
                if (gnetId == 3 || gnetId == 4) {
                    alertify.error(tipl[0])
                }
                if (gnetId == 1) {
                    alertify.error(tipl[1])
                }
            } else {

            }*/
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

            getMySts(defaultAccount);
        })
    }

    async function getMySts(addr) {
        // let addr = new URLSearchParams(window.location.search).get('defaultAccount');
        var id = 0;
        await dividendsInstance.methods.getIdByAddr(addr).call().then(res => {
            id = res;
        }).catch(err => {
            console.log(err);
            return;
        });
        await dividendsInstance.methods.getPlayerById(id).call().then(res => {
            player = res;
        }).catch(err => {
            console.log(err);
            return;
        });

        await dividendsInstance.methods.smallPrizePoolCount().call().then(async smallCount => {
            smallPoolPrizeCount = smallCount;
            await dividendsInstance.methods.getPrizePool(1, smallCount).call().then(res => {
                smallPoolPrize = res;
            }).catch(err => {
                console.log(err);
                return;
            });
        }).catch(err => {
            console.log(err);
            return;
        });

        var showaddr = addr.substring(0, 5) + "..." + addr.substring(37, addr.length);
        console.log(showaddr);
        $("#usall_content").find('.addr').html(showaddr);

        let bigArea = 0;
        let smallArea = 0;
        let vip1Num = 0;
        let vip2Num = 0;
        let vip3Num = 0;
        let vip4Num = 0;

        $.ajax({
            type: 'get',
            dataType: 'json',
            crossDomain: true,
            url: url + "/admin/vipConfig/statistics?chainId="+id+'&address='+defaultAccount,
            headers: {

            },
            success: function(result) {
                if (result != null && result != undefined) {
                    bigArea = result.data.max
                    if (isNull(bigArea)) {
                        bigArea = 0;
                    }
                    smallArea = result.data.min
                    if (isNull(smallArea)) {
                        smallArea = 0;
                    }
                    $.each( result.data.statics,function (i,ele) {
                        if(ele.level==1){
                            vip1Num = ele.count
                        }
                        else if(ele.level==2){
                            vip2Num = ele.count
                        }
                        else if(ele.level==3){
                            vip3Num = ele.count
                        }
                        else if(ele.level==4){
                            vip4Num = ele.count
                        }
                    })

                    $('#vips_content').find('.v1').html(vip1Num);
                    $('#vips_content').find('.v2').html(vip2Num);
                    $('#vips_content').find('.v3').html(vip3Num);
                    $('#vips_content').find('.v4').html(vip4Num);

                    var totalInvest = smallPoolPrize[2] / usdtBase;
                    $("#usall_content").find('.vip').html(player[3]);
                    $("#usall_content").find('.big').html(bigArea);
                    $("#usall_content").find('.sm').html(smallArea);
                    $("#usall_content").find('.total').html(totalInvest);
                    $("#usall_content").find('.weight').html((totalInvest * 0.12));
                    $("#usall_content").find('.angle').html((player[15] == 1 ? "Yes" : "No"));
                }
            },
            error: function(data) {
                // alertify.error("未知错误");
            }
        });
    }
    var init = function() {
        checkNet();
        setInterval(function() {
            checkNet();
        }, 3000);
    };

    init();

});
