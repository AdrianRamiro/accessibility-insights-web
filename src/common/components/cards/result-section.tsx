// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import { css } from '@uifabric/utilities';
import { NamedFC } from 'common/react/named-fc';
import * as React from 'react';

import { ResultSectionContent, ResultSectionContentDeps, ResultSectionContentProps } from './result-section-content';
import { ResultSectionTitle, ResultSectionTitleProps } from './result-section-title';
import * as styles from './result-section.scss';

export type ResultSectionDeps = ResultSectionContentDeps;

export type ResultSectionProps = ResultSectionContentProps &
    ResultSectionTitleProps & {
        containerClassName: string;
        deps: ResultSectionDeps;
    };

export const resultSectionAutomationId = 'result-section';

export const ResultSection = NamedFC<ResultSectionProps>('ResultSection', props => {
    const { containerClassName } = props;

    return (
        <div className={css(containerClassName, styles.resultSection)} data-automation-id={resultSectionAutomationId}>
            <h2>
                <ResultSectionTitle {...props} />
            </h2>
            <ResultSectionContent {...props} />
        </div>
    );
});
