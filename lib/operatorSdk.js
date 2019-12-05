"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core = __importStar(require("@actions/core"));
const tc = __importStar(require("@actions/tool-cache"));
const exec = __importStar(require("@actions/exec"));
const io = __importStar(require("@actions/io"));
const path = __importStar(require("path"));
const VersionInput = "version";
class OperatorSdkConfig {
    constructor(version) {
        this.version = version;
    }
}
exports.OperatorSdkConfig = OperatorSdkConfig;
function getOperatorSdkConfig() {
    const v = core.getInput(VersionInput);
    return new OperatorSdkConfig(v);
}
exports.getOperatorSdkConfig = getOperatorSdkConfig;
function downloadOperatorSdk(version) {
    return __awaiter(this, void 0, void 0, function* () {
        let url = `https://github.com/operator-framework/operator-sdk/releases/download/${version}/operator-sdk-${version}-x86_64-linux-gnu`;
        console.log("downloading operator-sdk from " + url);
        let downloadPath = null;
        downloadPath = yield tc.downloadTool(url);
        const binPath = "/home/runner/bin";
        yield io.mkdirP(binPath);
        yield exec.exec("chmod", ["+x", downloadPath]);
        yield io.mv(downloadPath, path.join(binPath, "operator-sdk"));
        core.addPath(binPath);
    });
}
exports.downloadOperatorSdk = downloadOperatorSdk;
