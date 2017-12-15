"use strict";
var CreateInvoiceUtil=function() {}

;
CreateInvoiceUtil.TOTAL_LINE_ITEMS=3,
CreateInvoiceUtil.addInvoiceLineItem=function() {
    var r=CreateInvoiceUtil.TOTAL_LINE_ITEMS+1,
    e="lineItem."+r,
    n=$(".trClone").clone();
    n.attr("id", e).removeClass("trClone hide").addClass("row-item"),
    CreateInvoiceUtil.assignIdToChildElements(n, r),
    n.appendTo(".lineItems"),
    CreateInvoiceUtil.updateTabIndexForLabels(r),
    CreateInvoiceUtil.TOTAL_LINE_ITEMS=r
}

,
CreateInvoiceUtil.showCloseIcon=function(r, e) {
    var n=$(r).find(".closeicon");
    return e?void n.removeClass("hide").addClass("show"): void n.removeClass("show").addClass("hide")
}

,
CreateInvoiceUtil.removeLineItem=function(r) {
    var e=$(r).attr("id").lastIndexOf("."),
    n=$(r).attr("id").substring(e+1),
    c=$(".lineItems").children().length-1;
    c>1&&($("#lineItem\\."+n).remove(), c--),
    CreateInvoiceUtil.calculateInvoiceTotal()
}

,
CreateInvoiceUtil.assignIdToChildElements=function(r, e) {
    for(var n=$(r).children(), c=n.length, a=Number($("#itemRate\\."+(e-1)).attr("tabindex"))+1, y=0;
    c>y;
    y++) {
        CreateInvoiceUtil.assignIdToChildElements(n[y], e);
        var u=$(n[y]).prop("tagName");
        if("INPUT"===u||"SPAN"===u||"TEXTAREA"===u||"A"===u) {
            if(void 0===$(n[y]).attr("id"))continue;
            var m=$(n[y]).attr("id").lastIndexOf("."),
            l=$(n[y]).attr("id").substring(0, m),
            o=l+"."+e;
            $(n[y]).attr("id", o),
            $(n[y]).attr("name", o),
            "TEXTAREA"===u&&(autosize($(n[y])), $(n[y]).addClass("lastLineItem")),
            void 0!==$(n[y]).attr("tabindex")&&$(n[y]).attr("tabindex", a)
        }
    }
}

,
CreateInvoiceUtil.updateTabIndexForLabels=function(r) {
    for(var e=$("#itemRate\\."+r).attr("tabindex")+1, n=["subTotalLabel", "taxLabel", "totalLabel", "currencyCode", "notesLabel", "customerNotes", "termsLabel", "terms"], c=0;
    7>=c;
    c++)$("#"+n[c]).attr("tabindex", e),
    e++
}

,
CreateInvoiceUtil.calculateItemTotal=function(r) {
    var e=$(r).attr("id").lastIndexOf("."),
    n=$(r).attr("id").substring(e+1),
    c="0.00";
    isNaN($("#itemQty\\."+n).val())?$("#itemQty\\."+n).val("1.00"): isNaN($("#itemRate\\."+n).val())&&$("#itemRate\\."+n).val("0.00");
    var a=Number($("#itemQty\\."+n).val()),
    y=Number($("#itemRate\\."+n).val());
    c=(a*y).toFixed("2"),
    $("#itemTotal\\."+n).val(c),
    CreateInvoiceUtil.calculateInvoiceTotal()
}

,
CreateInvoiceUtil.calculateInvoiceTotal=function() {
    for(var r=Number(0), e="0.00", n="", c=1;
    c<=CreateInvoiceUtil.TOTAL_LINE_ITEMS;
    c++)n=$("#itemTotal\\."+c),
    null===n||isNaN(n.val())||(e=Number(n.val()), r+=e);
    r=r.toFixed("2"),
    $("#subTotal").html(r),
    CreateInvoiceUtil.calculateInvTaxAndTotal()
}

,
CreateInvoiceUtil.hideHelpText=function() {}

,
CreateInvoiceUtil.checkAndAddNewLineItem=function(r, e) {
    if(9!==e.keyCode&&$(r).hasClass("lastLineItem")&&0===$(r).val().length) {
        var n=$(r).attr("id").lastIndexOf("."),
        c=Number($(r).attr("id").substring(n+1))+Number(1);
        CreateInvoiceUtil.addInvoiceLineItem(),
        $(r).removeClass("lastLineItem"),
        $("#itemDesc\\."+c).addClass("lastLineItem")
    }
}

,
CreateInvoiceUtil.calculateInvTaxAndTotal=function() {
    var r=$("#taxLabel").val(),
    e=r.match(/[\d\.]+/g),
    n=$("#subTotal").html(),
    c=null!==e?e[0]/100: 0, a=c*n, y=0===a?"": a.toFixed("2");
    $("#taxAmt").html(y);
    var u=Number(n)+Number(a);
    u=u.toFixed("2"),
    $("#total").html(u);
    console.log(inWords(u));
    $("#totalInWords").html(inWords(u));
}

;
var InvoiceGenerator= {
    baseUrl:"",
    mandElements: {
        compAddInfo: "address1", clientAddInfo: "billingAddress1", invNumberInfo: "invNumber", itemInfo: "itemDesc\\.1"
    }
    ,
    strikeInfo:function(r, e) {
        e?$("#"+r).addClass("highlight-content"): ($("#"+r).removeClass("highlight-content"), $("#"+this.mandElements[r]).val()?$("#"+r).addClass("rhs-strikethrough-info"): $("#"+r).removeClass("rhs-strikethrough-info"))
    }
    ,
    showHideErr:function(r, e) {
        var n=$("#"+r),
        c=$("#"+r+"_err");
        e?(n.addClass("error"), c.removeClass("hide")): (n.removeClass("error"), c.addClass("hide"))
    }
    ,
    saveInvoice:function(r, e) {
        var n=$(e);
        n.attr("disabled", !0);
        var c=this.constructJSONObjectFrmForm(r);
        c=this.removeEmptyLineitems(c);
        var a=this.validateForm(c),
        y=this.baseUrl+"/save";
        if(a) {
            var u=JSON.stringify(c);
            $.ajax( {
                method:"POST", url:y, data: {
                    JSONString: u
                }
            }
            ).done(function(r) {
                $("#x_invoice_file_id").val(r.data.file_id), $("#signupModal").modal(), n.attr("disabled", !1)
            }
            ).fail(function(r) {
                n.attr("disabled", !1), $("#signupModal").modal("hide");
                var e=r.responseText||"We were unable to save your invoice because of special characters. Please remove these special characters from the invoice and try again.";
                window.alert(e)
            }
            )
        }
        else n.attr("disabled", !1)
    }
    ,
    removeEmptyLineitems:function(r) {
        var e=r.line_items,
        n=this;
        return e.forEach(function(e, c) {
            ""===e.name&&(r.line_items.splice(c, 1), n.removeEmptyLineitems(r))
        }
        ),
        r
    }
    ,
    validateForm:function(r) {
        var e=!0;
        return r.company_name||(this.showHideErr("address1", !0), e=!1),
        r.customer_name||(this.showHideErr("billingAddress1", !0), e=!1),
        e
    }
    ,
    getInvoicePDF:function(r, e) {
        var n=this.constructJSONObjectFrmForm(r);
        n=this.removeEmptyLineitems(n);
        var c=JSON.stringify(n),
        a=this.baseUrl+"/pdf";
        e&&(a+="?print=true");
        var y=document.createElement("form");
        y.setAttribute("method", "POST"),
        y.setAttribute("action", a),
        y.setAttribute("target", "_blank");
        var u=document.createElement("input");
        u.setAttribute("name", "JSONString"),
        u.setAttribute("value", c),
        y.appendChild(u),
        document.body.appendChild(y),
        y.submit(),
        document.body.removeChild(y)
    }
    ,
    constructJSONObjectFrmForm:function(r) {
        var e=$("span[data-json-node]");
        e.each(function(e, n) {
            var c=$(this);
            $(r).append($("<input type='hidden' />").attr( {
                name: c.attr("name"), value: c.text()
            }
            ))
        }
        );
        var n=$(r).serializeArray(),
        c= {}
        ,
        a="",
        y=0,
        u="",
        m="",
        l=0,
        o= {}
        ,
        s=[],
        i="",
        t= {}
        ;
        for(var _ in n) {
            var b=$(document.getElementsByName(n[_].name)).data();
            if(b)if(b.isArray) {
                if(u=b.arrayParent, m=n[_].name.lastIndexOf("."), y=n[_].name.substring(m+1, n[_].name.length), a=""===a?y-1: a, i=""===i?u: i, 0===Number(y)) {
                    i="", a="", l=0, s=[], o= {}
                    ;
                    continue
                }
                Number(y-1)!==Number(a)&&(a=y-1, l+=1, o= {}
                ),
                i!==u&&(i="", l=0, s=[]),
                o=this.includeInJSON(o, b.jsonNode, n[_].value),
                s[l]=o,
                c[u]=s
            }
            else b.parentJson?(t=this.includeInJSON(t, b.jsonNode, n[_].value), c=this.includeInJSON(c, b.parentJson, t)):c=this.includeInJSON(c, b.jsonNode, n[_].value)
        }
        return c
    }
    ,
    includeInJSON:function(r, e, n) {
        return"undefined"!==n&&"null"!==n&&e&&(r[e]=n),
        r
    }
    ,
    showCurrencySelect:function(r, e) {
        var n=$("#"+r),
        c=$("#"+e);
        n.addClass("hide"),
        c.removeClass("hide"),
        $("#currencyCode").attr("value", $("#currencySelect").val()),
        $("#currencySym").attr("value", $("#currencySelect option:selected").attr("symbol"))
    }
    ,
    currencyList: {
        AED: {
            currency_name: "UAE Dirham", currency_symbol: "AED"
        }
        ,
        AFN: {
            currency_name: "Afghani", currency_symbol: "AFN"
        }
        ,
        ALL: {
            currency_name: "Lek", currency_symbol: "Lek"
        }
        ,
        AMD: {
            currency_name: "Armenian Dram", currency_symbol: "AMD"
        }
        ,
        ANG: {
            currency_name: "Netherlands Antillian Guilder", currency_symbol: "Æ’"
        }
        ,
        AOA: {
            currency_name: "Kwanza", currency_symbol: "AOA"
        }
        ,
        ARS: {
            currency_name: "Argentine Peso", currency_symbol: "$"
        }
        ,
        AUD: {
            currency_name: "Australian Dollar", currency_symbol: "$"
        }
        ,
        AWG: {
            currency_name: "Aruban Guilder", currency_symbol: "Æ’"
        }
        ,
        AZN: {
            currency_name: "Azerbaijanian Manat", currency_symbol: "AZN"
        }
        ,
        BAM: {
            currency_name: "Convertible Marks", currency_symbol: "KM"
        }
        ,
        BBD: {
            currency_name: "Barbados Dollar", currency_symbol: "$"
        }
        ,
        BDT: {
            currency_name: "Taka", currency_symbol: "BDT"
        }
        ,
        BGN: {
            currency_name: "Bulgarian Lev", currency_symbol: "BGN"
        }
        ,
        BHD: {
            currency_name: "Bahraini Dinar", currency_symbol: "BHD"
        }
        ,
        BIF: {
            currency_name: "Burundi Franc", currency_symbol: "BIF"
        }
        ,
        BMD: {
            currency_name: "Bermudian Dollar (Bermuda Dollar)", currency_symbol: "$"
        }
        ,
        BND: {
            currency_name: "Brunei Dollar", currency_symbol: "$"
        }
        ,
        BOB: {
            currency_name: "Boliviano", currency_symbol: "$b"
        }
        ,
        BOV: {
            currency_name: "Mvdol", currency_symbol: "BOV"
        }
        ,
        BRL: {
            currency_name: "Brazilian Real", currency_symbol: "R$"
        }
        ,
        BSD: {
            currency_name: "Bahamian Dollar", currency_symbol: "$"
        }
        ,
        BTC: {
            currency_name: "Bitcoin", currency_symbol: "BTC"
        }
        ,
        BTN: {
            currency_name: "Ngultrum", currency_symbol: "BTN"
        }
        ,
        BWP: {
            currency_name: "Pula", currency_symbol: "P"
        }
        ,
        BYR: {
            currency_name: "Belarussian Ruble", currency_symbol: "p."
        }
        ,
        BZD: {
            currency_name: "Belize Dollar", currency_symbol: "BZ$"
        }
        ,
        CAD: {
            currency_name: "Canadian Dollar", currency_symbol: "$"
        }
        ,
        CDF: {
            currency_name: "Franc Congolais", currency_symbol: "CDF"
        }
        ,
        CHE: {
            currency_name: "WIR Euro", currency_symbol: "CHE"
        }
        ,
        CHF: {
            currency_name: "Swiss Franc", currency_symbol: "CHF"
        }
        ,
        CHW: {
            currency_name: "WIR Franc", currency_symbol: "CHW"
        }
        ,
        CLF: {
            currency_name: "Unidades de formento", currency_symbol: "CLF"
        }
        ,
        CLP: {
            currency_name: "Chilean Peso", currency_symbol: "$"
        }
        ,
        CNY: {
            currency_name: "Yuan Renminbi", currency_symbol: "CNY"
        }
        ,
        COP: {
            currency_name: "Colombian Peso", currency_symbol: "$"
        }
        ,
        COU: {
            currency_name: "Unidad de Valor Real", currency_symbol: "COU"
        }
        ,
        CRC: {
            currency_name: "Costa Rican Colon", currency_symbol: "CRC"
        }
        ,
        CUC: {
            currency_name: "Cuba Convertible Peso", currency_symbol: "CUC$"
        }
        ,
        CUP: {
            currency_name: "Cuban Peso", currency_symbol: "CUP"
        }
        ,
        CVE: {
            currency_name: "Cape Verde Escudo", currency_symbol: "CVE"
        }
        ,
        CYP: {
            currency_name: "Cyprus Pound", currency_symbol: "CYP"
        }
        ,
        CZK: {
            currency_name: "Czech Koruna", currency_symbol: "CZK"
        }
        ,
        DJF: {
            currency_name: "Djibouti Franc", currency_symbol: "DJF"
        }
        ,
        DKK: {
            currency_name: "Danish Krone", currency_symbol: "kr"
        }
        ,
        DOP: {
            currency_name: "Dominican Peso", currency_symbol: "RD$"
        }
        ,
        DZD: {
            currency_name: "Algerian Dinar", currency_symbol: "DZD"
        }
        ,
        EEK: {
            currency_name: "Kroon", currency_symbol: "kr"
        }
        ,
        EGP: {
            currency_name: "Egyptian Pound", currency_symbol: "Â£"
        }
        ,
        ERN: {
            currency_name: "Nakfa", currency_symbol: "ERN"
        }
        ,
        ETB: {
            currency_name: "Ethiopian Birr", currency_symbol: "ETB"
        }
        ,
        EUR: {
            currency_name: "Euro", currency_symbol: "â‚¬"
        }
        ,
        FJD: {
            currency_name: "Fiji Dollar", currency_symbol: "$"
        }
        ,
        FKP: {
            currency_name: "Falkland Islands Pound", currency_symbol: "Â£"
        }
        ,
        GBP: {
            currency_name: "Pound Sterling", currency_symbol: "Â£"
        }
        ,
        GEL: {
            currency_name: "Lari", currency_symbol: "GEL"
        }
        ,
        GGP: {
            currency_name: "Guernsey Pound", currency_symbol: "Â£"
        }
        ,
        GHS: {
            currency_name: "Cedi", currency_symbol: "Â¢"
        }
        ,
        GIP: {
            currency_name: "Gibraltar Pound", currency_symbol: "Â£"
        }
        ,
        GMD: {
            currency_name: "Dalasi", currency_symbol: "GMD"
        }
        ,
        GNF: {
            currency_name: "Guinea Franc", currency_symbol: "GNF"
        }
        ,
        GTQ: {
            currency_name: "Quetzal", currency_symbol: "Q"
        }
        ,
        GWP: {
            currency_name: "Guinea-Bissau Peso", currency_symbol: "GWP"
        }
        ,
        GYD: {
            currency_name: "Guyana Dollar", currency_symbol: "$"
        }
        ,
        HKD: {
            currency_name: "Hong Kong Dollar", currency_symbol: "å…ƒ"
        }
        ,
        HNL: {
            currency_name: "Lempira", currency_symbol: "L"
        }
        ,
        HRK: {
            currency_name: "Croatian Kuna", currency_symbol: "kn"
        }
        ,
        HTG: {
            currency_name: "Gourde", currency_symbol: "HTG"
        }
        ,
        HUF: {
            currency_name: "Forint", currency_symbol: "Ft"
        }
        ,
        IDR: {
            currency_name: "Rupiah", currency_symbol: "Rp"
        }
        ,
        ILS: {
            currency_name: "New Israeli Sheqel", currency_symbol: "ILS"
        }
        ,
        IMP: {
            currency_name: "Isle of Man Pound", currency_symbol: "Â£"
        }
        ,
        INR: {
            currency_name: "Indian Rupee", currency_symbol: "Rs."
        }
        ,
        IQD: {
            currency_name: "Iraqi Dinar", currency_symbol: "IQD"
        }
        ,
        IRR: {
            currency_name: "Iranian Rial", currency_symbol: "IRR"
        }
        ,
        ISK: {
            currency_name: "Iceland Krona", currency_symbol: "kr"
        }
        ,
        JEP: {
            currency_name: "Jersey Pound", currency_symbol: "Â£"
        }
        ,
        JMD: {
            currency_name: "Jamaican Dollar", currency_symbol: "J$"
        }
        ,
        JOD: {
            currency_name: "Jordanian Dinar", currency_symbol: "JOD"
        }
        ,
        JPY: {
            currency_name: "Yen", currency_symbol: "Â¥"
        }
        ,
        KES: {
            currency_name: "Kenyan Shilling", currency_symbol: "KES"
        }
        ,
        KGS: {
            currency_name: "Som", currency_symbol: "KGS"
        }
        ,
        KHR: {
            currency_name: "Riel", currency_symbol: "KHR"
        }
        ,
        KMF: {
            currency_name: "Comoro Franc", currency_symbol: "KMF"
        }
        ,
        KPW: {
            currency_name: "North Korean Won", currency_symbol: "â‚©"
        }
        ,
        KRW: {
            currency_name: "Won", currency_symbol: "â‚©"
        }
        ,
        KWD: {
            currency_name: "Kuwaiti Dinar", currency_symbol: "KWD"
        }
        ,
        KYD: {
            currency_name: "Cayman Islands Dollar", currency_symbol: "$"
        }
        ,
        KZT: {
            currency_name: "Tenge", currency_symbol: "KZT"
        }
        ,
        LAK: {
            currency_name: "Kip", currency_symbol: "LAK"
        }
        ,
        LBP: {
            currency_name: "Lebanese Pound", currency_symbol: "Â£"
        }
        ,
        LKR: {
            currency_name: "Sri Lanka Rupee", currency_symbol: "Rs"
        }
        ,
        LRD: {
            currency_name: "Liberian Dollar", currency_symbol: "$"
        }
        ,
        LSL: {
            currency_name: "Loti", currency_symbol: "LSL"
        }
        ,
        LTL: {
            currency_name: "Lithuanian Litas", currency_symbol: "Lt"
        }
        ,
        LVL: {
            currency_name: "Latvian Lats", currency_symbol: "Ls"
        }
        ,
        LYD: {
            currency_name: "Libyan Dinar", currency_symbol: "LYD"
        }
        ,
        MAD: {
            currency_name: "Moroccan Dirham", currency_symbol: "MAD"
        }
        ,
        MDL: {
            currency_name: "Moldovan Leu", currency_symbol: "MDL"
        }
        ,
        MGA: {
            currency_name: "Malagascy Ariary", currency_symbol: "MGA"
        }
        ,
        MKD: {
            currency_name: "Denar", currency_symbol: "MKD"
        }
        ,
        MMK: {
            currency_name: "Kyat", currency_symbol: "MMK"
        }
        ,
        MNT: {
            currency_name: "Tugrik", currency_symbol: "MNT"
        }
        ,
        MOP: {
            currency_name: "Pataca", currency_symbol: "MOP"
        }
        ,
        MRO: {
            currency_name: "Ouguiya", currency_symbol: "MRO"
        }
        ,
        MTL: {
            currency_name: "Maltese Lira", currency_symbol: "MTL"
        }
        ,
        MUR: {
            currency_name: "Mauritius Rupee", currency_symbol: "Rp"
        }
        ,
        MVR: {
            currency_name: "Rufiyaa", currency_symbol: "MVR"
        }
        ,
        MWK: {
            currency_name: "Kwacha", currency_symbol: "MWK"
        }
        ,
        MXN: {
            currency_name: "Mexican Peso", currency_symbol: "$"
        }
        ,
        MXV: {
            currency_name: "Mexican Unidad de Inversion (UID)", currency_symbol: "MXV"
        }
        ,
        MYR: {
            currency_name: "Malaysian Ringgit", currency_symbol: "RM"
        }
        ,
        MZN: {
            currency_name: "Metical", currency_symbol: "MT"
        }
        ,
        NAD: {
            currency_name: "Namibian Dollar", currency_symbol: "$"
        }
        ,
        NGN: {
            currency_name: "Naira", currency_symbol: "NGN"
        }
        ,
        NIO: {
            currency_name: "Cordoba Oro", currency_symbol: "C$"
        }
        ,
        NOK: {
            currency_name: "Norwegian Krone", currency_symbol: "kr"
        }
        ,
        NPR: {
            currency_name: "Nepalese Rupee", currency_symbol: "Rp"
        }
        ,
        NZD: {
            currency_name: "New Zealand Dollar", currency_symbol: "$"
        }
        ,
        OMR: {
            currency_name: "Rial Omani", currency_symbol: "OMR"
        }
        ,
        PAB: {
            currency_name: "Balboa", currency_symbol: "B/."
        }
        ,
        PEN: {
            currency_name: "Nuevo Sol", currency_symbol: "S/."
        }
        ,
        PGK: {
            currency_name: "Kina", currency_symbol: "PGK"
        }
        ,
        PHP: {
            currency_name: "Philippine Peso", currency_symbol: "Php"
        }
        ,
        PKR: {
            currency_name: "Pakistan Rupee", currency_symbol: "Rs"
        }
        ,
        PLN: {
            currency_name: "Zloty", currency_symbol: "PLN"
        }
        ,
        PYG: {
            currency_name: "Guarani", currency_symbol: "Gs"
        }
        ,
        QAR: {
            currency_name: "Qatari Rial", currency_symbol: "QAR"
        }
        ,
        ROL: {
            currency_name: "Old Leu", currency_symbol: "ROL"
        }
        ,
        RON: {
            currency_name: "New Leu", currency_symbol: "lei"
        }
        ,
        RSD: {
            currency_name: "Serbian Dinar", currency_symbol: "RSD"
        }
        ,
        RUB: {
            currency_name: "Russian Ruble", currency_symbol: "RUB"
        }
        ,
        RWF: {
            currency_name: "Rwanda Franc", currency_symbol: "RWF"
        }
        ,
        SAR: {
            currency_name: "Saudi Riyal", currency_symbol: "SAR"
        }
        ,
        SBD: {
            currency_name: "Solomon Islands Dollar", currency_symbol: "$"
        }
        ,
        SCR: {
            currency_name: "Seychelles Rupee", currency_symbol: "Rp"
        }
        ,
        SDD: {
            currency_name: "Sudanese Dinar", currency_symbol: "SDD"
        }
        ,
        SDG: {
            currency_name: "Sudanese Pound", currency_symbol: "SDG"
        }
        ,
        SEK: {
            currency_name: "Swedish Krona", currency_symbol: "kr"
        }
        ,
        SGD: {
            currency_name: "Singapore Dollar", currency_symbol: "$"
        }
        ,
        SHP: {
            currency_name: "Saint Helena Pound", currency_symbol: "Â£"
        }
        ,
        SIT: {
            currency_name: "Tolar", currency_symbol: "SIT"
        }
        ,
        SKK: {
            currency_name: "Slovak Koruna", currency_symbol: "SKK"
        }
        ,
        SLL: {
            currency_name: "Leone", currency_symbol: "SLL"
        }
        ,
        SOS: {
            currency_name: "Somali Shilling", currency_symbol: "S"
        }
        ,
        SRD: {
            currency_name: "Surinam Dollar", currency_symbol: "$"
        }
        ,
        STD: {
            currency_name: "Dobra", currency_symbol: "STD"
        }
        ,
        SVC: {
            currency_name: "El Salvador Colon", currency_symbol: "$"
        }
        ,
        SYP: {
            currency_name: "Syrian Pound", currency_symbol: "Â£"
        }
        ,
        SZL: {
            currency_name: "Lilangeni", currency_symbol: "SZL"
        }
        ,
        THB: {
            currency_name: "Baht", currency_symbol: "THB"
        }
        ,
        TJS: {
            currency_name: "Somoni", currency_symbol: "TJS"
        }
        ,
        TMT: {
            currency_name: "Manat", currency_symbol: "TMT"
        }
        ,
        TND: {
            currency_name: "Tunisian Dinar", currency_symbol: "TND"
        }
        ,
        TOP: {
            currency_name: "Paanga", currency_symbol: "TOP"
        }
        ,
        TRL: {
            currency_name: "Turkish Lira", currency_symbol: "TL"
        }
        ,
        TRY: {
            currency_name: "New Turkish Lira", currency_symbol: "YTL"
        }
        ,
        TTD: {
            currency_name: "Trinidad and Tobago Dollar", currency_symbol: "TT$"
        }
        ,
        TVD: {
            currency_name: "Tuvalu Dollar", currency_symbol: "$"
        }
        ,
        TWD: {
            currency_name: "New Taiwan Dollar", currency_symbol: "NT$"
        }
        ,
        TZS: {
            currency_name: "Tanzanian Shilling", currency_symbol: "TZS"
        }
        ,
        UAH: {
            currency_name: "Hryvnia", currency_symbol: "UAH"
        }
        ,
        UGX: {
            currency_name: "Uganda Shilling", currency_symbol: "UGX"
        }
        ,
        USD: {
            currency_name: "US Dollar", currency_symbol: "$"
        }
        ,
        UYI: {
            currency_name: "Uruguay Peso en Unidades Indexadas", currency_symbol: "UYI"
        }
        ,
        UYU: {
            currency_name: "Peso Uruguayo", currency_symbol: "$U"
        }
        ,
        UZS: {
            currency_name: "Uzbekistan Sum", currency_symbol: "UZS"
        }
        ,
        VEB: {
            currency_name: "Bolivar", currency_symbol: "VEB"
        }
        ,
        VEF: {
            currency_name: "Bolivar Fuerte", currency_symbol: "VEF"
        }
        ,
        VND: {
            currency_name: "Dong", currency_symbol: "VND"
        }
        ,
        VUV: {
            currency_name: "Vatu", currency_symbol: "VUV"
        }
        ,
        WST: {
            currency_name: "Tala", currency_symbol: "WST"
        }
        ,
        XAF: {
            currency_name: "CFA Franc BEAC", currency_symbol: "XAF"
        }
        ,
        XCD: {
            currency_name: "East Caribbean Dollar", currency_symbol: "$"
        }
        ,
        XDR: {
            currency_name: "SDR", currency_symbol: "XDR"
        }
        ,
        XOF: {
            currency_name: "CFA Franc BCEAO", currency_symbol: "XOF"
        }
        ,
        XPF: {
            currency_name: "CFP Franc", currency_symbol: "XPF"
        }
        ,
        YER: {
            currency_name: "Yemeni Rial", currency_symbol: "YER"
        }
        ,
        ZAR: {
            currency_name: "Rand", currency_symbol: "R"
        }
        ,
        ZMK: {
            currency_name: "Kwacha", currency_symbol: "ZMK"
        }
        ,
        ZWD: {
            currency_name: "Zimbabwe Dollar", currency_symbol: "Z$"
        }
    }
}

;