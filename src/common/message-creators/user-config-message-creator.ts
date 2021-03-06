// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import {
    SaveIssueFilingSettingsPayload,
    SetHighContrastModePayload,
    SetIssueFilingServicePayload,
    SetIssueFilingServicePropertyPayload,
    SetTelemetryStatePayload,
} from 'background/actions/action-payloads';
import { ActionMessageDispatcher } from 'common/message-creators/types/dispatcher';

import { Messages } from '../messages';

export class UserConfigMessageCreator {
    constructor(private readonly dispatcher: ActionMessageDispatcher) {}
    public setTelemetryState(enableTelemetry: boolean): void {
        const payload: SetTelemetryStatePayload = {
            enableTelemetry,
        };

        this.dispatcher.dispatchMessage({
            messageType: Messages.UserConfig.SetTelemetryConfig,
            payload,
        });
    }

    public setHighContrastMode(enableHighContrast: boolean): void {
        const payload: SetHighContrastModePayload = {
            enableHighContrast,
        };

        this.dispatcher.dispatchMessage({
            messageType: Messages.UserConfig.SetHighContrastConfig,
            payload,
        });
    }

    public setIssueFilingService = (payload: SetIssueFilingServicePayload) => {
        this.dispatcher.dispatchMessage({
            messageType: Messages.UserConfig.SetIssueFilingService,
            payload,
        });
    };

    public setIssueFilingServiceProperty = (payload: SetIssueFilingServicePropertyPayload) => {
        this.dispatcher.dispatchMessage({
            messageType: Messages.UserConfig.SetIssueFilingServiceProperty,
            payload,
        });
    };

    public saveIssueFilingSettings = (payload: SaveIssueFilingSettingsPayload) => {
        this.dispatcher.dispatchMessage({
            messageType: Messages.UserConfig.SaveIssueFilingSettings,
            payload,
        });
    };
}
