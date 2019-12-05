import * as core from '@actions/core';
import { OperatorSdkConfig, getOperatorSdkConfig, downloadOperatorSdk } from './operatorSdk';

async function run() {
    try {
        let cfg: OperatorSdkConfig = getOperatorSdkConfig();
        await downloadOperatorSdk(cfg.version);
    } catch (error) {
        core.setFailed(error.message);
    }
}

run();
