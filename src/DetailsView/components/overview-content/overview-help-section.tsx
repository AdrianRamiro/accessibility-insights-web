// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import * as React from 'react';
import { HyperlinkDefinition } from 'views/content/content-page';

import { NamedFC } from '../../../common/react/named-fc';
import { HelpLinks, HelpLinksDeps } from './help-links';
import * as styles from './overview-help-section.scss';

export type OverviewHelpSectionDeps = HelpLinksDeps;

export interface OverviewHelpSectionProps {
    deps: OverviewHelpSectionDeps;
    linkDataSource: HyperlinkDefinition[];
}

export const OverviewHelpSection = NamedFC('OverviewHelpSection', (props: OverviewHelpSectionProps) => {
    return (
        <section className={styles.overviewHelpContainer}>
            <h3 className={styles.helpHeading}>Help</h3>
            <HelpLinks linkInformation={props.linkDataSource} deps={props.deps} />
        </section>
    );
});
