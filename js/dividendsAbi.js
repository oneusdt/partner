let dividendsAbi =
    [
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "techniDiviAddr",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "callContractAddr",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "ticketAddress",
                    "type": "address"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "playerAddr",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "uint256",
                    "name": "playerId",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "_value",
                    "type": "uint256"
                },
                {
                    "indexed": true,
                    "internalType": "uint256",
                    "name": "bigPrizePoolCount",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "smallPrizePoolCount",
                    "type": "uint256"
                }
            ],
            "name": "LogInvestment",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "_from",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "_to",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "_value",
                    "type": "uint256"
                }
            ],
            "name": "LogTransfer",
            "type": "event"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "uValue",
                    "type": "uint256"
                }
            ],
            "name": "FH",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "_allInvestUsdt",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "_callContractAddr",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "_owner",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                },
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "_playerAddrMap",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "_playerCount",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "_playerMap",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "id",
                    "type": "uint256"
                },
                {
                    "internalType": "address",
                    "name": "addr",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "referrerId",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "referrerLevel",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "vipLevel",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "isOut",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "investAmt",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "incomeAmt",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "totalInvestAmt",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "isAmbassador",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "playerLevel",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "investTime",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "outAmt",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "blockHigh",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "_playerOtherMap",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "id",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "teamBalance",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "ambassBalance",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "dynamicIncome",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "staticIncome",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "notWithdrawnBalance",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "isSettleAmb",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "thisInvestAmt",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "settledDays",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "staticBalance",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "dynamicBalance",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "prizePoolIncome",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "isStaticReboot",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "staticRebootTime",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "_stoped",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "_techniDiviAddr",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "_ticketAddress",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "bigPrizePoolCount",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "prizePoolCount",
                    "type": "uint256"
                }
            ],
            "name": "drawBigPrize",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "prizePoolCount",
                    "type": "uint256"
                }
            ],
            "name": "drawSmallPrize",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "id",
                    "type": "uint256"
                }
            ],
            "name": "getAddrById",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "id",
                    "type": "uint256"
                }
            ],
            "name": "getDirectPushs",
            "outputs": [
                {
                    "internalType": "uint256[]",
                    "name": "",
                    "type": "uint256[]"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "addr",
                    "type": "address"
                }
            ],
            "name": "getIdByAddr",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "id",
                    "type": "uint256"
                }
            ],
            "name": "getPlayerById",
            "outputs": [
                {
                    "internalType": "uint256[]",
                    "name": "",
                    "type": "uint256[]"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "addr",
                    "type": "address"
                }
            ],
            "name": "getPlayerId",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "poolType",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "poolNum",
                    "type": "uint256"
                }
            ],
            "name": "getPrizePool",
            "outputs": [
                {
                    "internalType": "uint256[]",
                    "name": "",
                    "type": "uint256[]"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "poolType",
                    "type": "uint256"
                }
            ],
            "name": "getSmallPlayer",
            "outputs": [
                {
                    "internalType": "uint256[]",
                    "name": "",
                    "type": "uint256[]"
                },
                {
                    "internalType": "uint256[]",
                    "name": "",
                    "type": "uint256[]"
                },
                {
                    "internalType": "uint256[]",
                    "name": "",
                    "type": "uint256[]"
                },
                {
                    "internalType": "uint256[]",
                    "name": "",
                    "type": "uint256[]"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "uValue",
                    "type": "uint256"
                },
                {
                    "internalType": "address",
                    "name": "referrerAddr",
                    "type": "address"
                }
            ],
            "name": "investment",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "id",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "income",
                    "type": "uint256"
                }
            ],
            "name": "isOutPlayer",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "preSmallPrizePoolCount",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "playerAddr",
                    "type": "address"
                }
            ],
            "name": "registry",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "callContractAddr",
                    "type": "address"
                }
            ],
            "name": "setCallContractAddr",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "techniDiviAddr",
                    "type": "address"
                }
            ],
            "name": "setTechniDiviAddr",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "smallPrizePoolCount",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "stopContract",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "srcId",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "id",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "income",
                    "type": "uint256"
                }
            ],
            "name": "updateAmbalanceOnlyTicket",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "id",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "isAmbassador",
                    "type": "uint256"
                }
            ],
            "name": "updateIsAmbassOnlyTicket",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "id",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "difDays",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "thisIncome",
                    "type": "uint256"
                }
            ],
            "name": "updateStaticOnlyTicket",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "id",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "vipLevel",
                    "type": "uint256"
                }
            ],
            "name": "updateVipLevelOnlyTicket",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "withdrawAmbassBalance",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "withdrawPerBalance",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "withdrawTeamBalance",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "withdrawWinBalance",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "stateMutability": "payable",
            "type": "receive"
        }
    ];
