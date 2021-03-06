function FormFillerDefaultOptions() {
    var options = {};
    options.enableContextMenu = true;
    options.ignoreFieldsWithContent = false;
    options.triggerClickEvents = true;
    options.ignoreHiddenFields = true;
    options.ignoredFields = ['captcha', 'hipinputtext'];
    options.confirmFields = ['confirm', 'reenter', 'retype', 'repeat'];
    options.agreeTermsFields = ['agree', 'terms', 'conditions'];

    options.passwordSettings = {
        mode: 'defined',
        password: 'Pa$$w0rd!'
    };

    options.emailSettings = {
        username: 'random',
        usernameList: ['jack', 'sparrow', 'frodo', 'baggins'],
        hostname: 'list',
        hostnameList: ['hotmail.com', 'gmail.com', 'yahoo.com']
    };

    options.fieldMatchSettings = {
        matchLabel: true,
        matchId: true,
        matchName: true,
        matchClass: false
    };

    options.fields = [];

    options.fields.push({
        type: 'username',
        name: 'Username',
        match: ['userid', 'username']
    });

    options.fields.push({
        type: 'first-name',
        name: 'First Name',
        match: ['firstname']
    });

    options.fields.push({
        type: 'last-name',
        name: 'Last Name',
        match: ['lastname', 'surname', 'secondname']
    });

    options.fields.push({
        type: 'email',
        name: 'Email Address',
        match: ['email']
    });

    options.fields.push({
        type: 'organization',
        name: 'Organization or Company Name',
        match: ['organization', 'organisation', 'company']
    });

    options.fields.push({
        type: 'full-name',
        name: 'Full Name',
        match: ['fullname', 'name']
    });

    options.fields.push({
        type: 'telephone',
        name: 'Telephone Number',
        match: ['phone', 'fax'],
        template: '+XXX-Xx-Xxxxxxx'
    });

    options.fields.push({
        type: 'number',
        name: 'A Random Number between 1 and 1000',
        match: ['integer', 'number', 'numeric', 'price', 'qty', 'quantity'],
        min: 1,
        max: 1000
    });

    options.fields.push({
        type: 'number',
        name: 'Zip Code',
        match: ['zip'],
        min: 10000,
        max: 99999
    });

    options.fields.push({
        type: 'number',
        name: 'Day',
        match: ['day'],
        min: 1,
        max: 28
    });

    options.fields.push({
        type: 'number',
        name: 'Month',
        match: ['month'],
        min: 1,
        max: 12
    });

    options.fields.push({
        type: 'number',
        name: 'Year',
        match: ['year'],
        min: 1970,
        max: 2013
    });

    options.fields.push({
        type: 'date',
        name: 'Date',
        match: ['date'],
        template: 'DD-MMM-YYYY'
    });

    options.fields.push({
        type: 'url',
        name: 'Website Address',
        match: ['website']
    });

    options.fields.push({
        type: 'regex',
        name: 'Address Line 1',
        match: ['address1', 'addressline1'],
        template: '([1-9][0-9][0-9]?) (North |East |West |South |||||)(Green |White |Rocky ||||||||)(Nobel|Fabien|Hague|Oak|Second|First|Cowley|Clarendon|New|Old|Milton) (Avenue|Boulevard|Court|Drive|Extension|Freeway|Lane|Parkway|Road|Street)'
    });

    options.fields.push({
        type: 'regex',
        name: 'P.O. Box',
        match: ['pobox', 'postbox'],
        template: '((P\\.O\\.)|(PO)) Box [1-9][0-9]{0,4}'
    });

    return options;
}

function GetFormFillerOptions() {
    var optionsString = localStorage.getItem('options');
    var options = optionsString
        ? JSON.parse(optionsString)
        : FormFillerDefaultOptions();
    return options;
}

function SaveFormFillerOptions(options) {
    localStorage.setItem('options', JSON.stringify(options));
}

function CreateContextMenus() {
    chrome.contextMenus.removeAll();

    var options = GetFormFillerOptions();

    if (options.enableContextMenu) {
        chrome.contextMenus.create({'title': 'Form Filler', contexts: ['page', 'editable'], 'id': 'parent', documentUrlPatterns: ['http://*/*', 'https://*/*']});
        chrome.contextMenus.create({'title': 'Fill all inputs', contexts: ['page', 'editable'], 'parentId': 'parent', 'id': 'all', documentUrlPatterns: ['http://*/*', 'https://*/*']});
        chrome.contextMenus.create({'title': 'Fill this form', contexts: ['page', 'editable'], 'parentId': 'parent', 'id': 'form', documentUrlPatterns: ['http://*/*', 'https://*/*']});
        chrome.contextMenus.create({'title': 'Fill this input', contexts: ['page', 'editable'], 'parentId': 'parent', 'id': 'input', documentUrlPatterns: ['http://*/*', 'https://*/*']});
    }
}

function GetKeyboardShortcuts() {
    var keyboardShortcuts = localStorage.getItem('keyboardShortcuts');
    return JSON.parse(keyboardShortcuts);
}

function SaveKeyboardShortcuts() {
    chrome.commands.getAll(function (command) {
        var keyboardShortcuts = [];
        for (var i = 0; i < command.length; i++) {
            if (command[i].description) {
                keyboardShortcuts.push(command[i]);
            }
        }
        localStorage.setItem('keyboardShortcuts', JSON.stringify(keyboardShortcuts));
    });
}
SaveKeyboardShortcuts();
