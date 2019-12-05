import * as core from '@actions/core';
import * as tc from '@actions/tool-cache';
import * as exec from '@actions/exec';
import * as io from '@actions/io';
import * as path from 'path';

const VersionInput: string = "version";

export class OperatorSdkConfig {
    version: string;

    constructor(version: string) {
        this.version = version;
    }
}

export function getOperatorSdkConfig(): OperatorSdkConfig {
    const v: string = core.getInput(VersionInput);
    return new OperatorSdkConfig(v);
}

export async function downloadOperatorSdk(version: string) {
    let url: string = `https://github.com/operator-framework/operator-sdk/releases/download/${version}/operator-sdk-${version}-x86_64-linux-gnu`;
    console.log("downloading operator-sdk from " + url);
    let downloadPath: string | null = null;
    downloadPath = await tc.downloadTool(url);
    const binPath: string = "/home/runner/bin";
    await io.mkdirP(binPath);
    await exec.exec("chmod", ["+x", downloadPath]);
    await io.mv(downloadPath, path.join(binPath, "operator-sdk"));

    core.addPath(binPath);
}