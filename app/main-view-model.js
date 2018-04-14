var Observable = require("data/observable").Observable;

// This module will give us access to the native Android context
// See https://docs.nativescript.org/core-concepts/utils
var utilsModule = require("tns-core-modules/utils/utils");

// This method receives a native Android string ID name (like "example_string"),
// and it returns a native Android integer ID
const getAndroidStringId = utilsModule.ad.resources.getStringId;

// Android Application object.
// This object's getString() method receives a native Android integer ID,
// and returns an actual Android native string
const androidApp = utilsModule.ad.getApplication()

/*
 *  @param id: a string with the name of the native ID
 *  @return  : the native Android string with that ID
 */
function getAndroidNativeString(idName) {
    var androidId = getAndroidStringId(idName);
    return androidApp.getString(androidId);
}

function getMessage(counter) {
    if (counter <= 0) {
        return "Hoorraaay! You unlocked the NativeScript clicker achievement!";
    } else {
        return counter + " taps left";
    }
}

function createViewModel() {
    var viewModel = new Observable();
    viewModel.counter = 42;
    viewModel.message = getMessage(viewModel.counter);
    viewModel.androidString = getAndroidNativeString('example_string')

    viewModel.onTap = function() {
        this.counter--;
        this.set("message", getMessage(this.counter));
    }

    return viewModel;
}

exports.createViewModel = createViewModel;