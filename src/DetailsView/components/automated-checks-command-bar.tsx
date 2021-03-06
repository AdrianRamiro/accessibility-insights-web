// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import * as React from 'react';

import { NamedFC } from 'common/react/named-fc';
import { CommandBarProps } from './details-view-command-bar';
import { DetailsViewCommandBar } from './details-view-command-bar';

export const AutomatedChecksCommandBar = NamedFC<CommandBarProps>('AutomatedChecksCommandBar', props => {
    return <DetailsViewCommandBar {...props} />;
});
