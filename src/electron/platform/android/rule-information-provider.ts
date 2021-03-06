// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import { UnifiedFormattableResolution } from 'common/types/store-data/unified-data-interface';
import { DictionaryStringTo } from 'types/common-types';

import { RuleInformation } from './rule-information';
import { RuleResultsData } from './scan-results';

export class RuleInformationProvider {
    private supportedRules: DictionaryStringTo<RuleInformation>;

    constructor() {
        this.supportedRules = {
            ColorContrast: new RuleInformation(
                'ColorContrast',
                'Text elements must have sufficient contrast against the background.',
                this.getColorContrastUnifiedFormattableResolution,
                this.includeColorContrastResult,
            ),
            TouchSizeWcag: new RuleInformation(
                'TouchSizeWcag',
                'Touch inputs must have a sufficient target size.',
                this.getTouchSizeUnifiedFormattableResolution,
                this.includeAllResults,
            ),
            ActiveViewName: new RuleInformation(
                'ActiveViewName',
                "Active views must have a name that's available to assistive technologies.",
                () =>
                    this.buildUnifiedFormattableResolution(
                        'The view is active but has no name available to assistive technologies. Provide a name for the view using its contentDescription, hint, labelFor, or text attribute (depending on the view type)',
                        ['contentDescription', 'hint', 'labelFor', 'text'],
                    ),
                this.includeAllResults,
            ),
            ImageViewName: new RuleInformation(
                'ImageViewName',
                'Meaningful images must have alternate text.',
                () =>
                    this.buildUnifiedFormattableResolution(
                        'The image has no alternate text and is not identified as decorative. If the image conveys meaningful content, provide alternate text using the contentDescription attribute. If the image is decorative, give it an empty contentDescription, or set its isImportantForAccessibility attribute to false.',
                        ['contentDescription', 'isImportantForAccessibility'],
                    ),
                this.includeAllResults,
            ),
            EditTextValue: new RuleInformation(
                'EditTextValue',
                'EditText elements must expose their entered text value to assistive technologies',
                () =>
                    this.buildUnifiedFormattableResolution(
                        "The element's contentDescription overrides the text value required by assistive technologies. Remove the element’s contentDescription attribute.",
                        ['contentDescription'],
                    ),
                this.includeAllResults,
            ),
        };
    }

    private getColorContrastUnifiedFormattableResolution = (
        ruleResultsData: RuleResultsData,
    ): UnifiedFormattableResolution => {
        const ratio = this.floorTo3Decimal(ruleResultsData.props['Color Contrast Ratio'] as number);
        const foreground = this.getColorValue(ruleResultsData, 'Foreground Color');
        const background = this.getColorValue(ruleResultsData, 'Background Color');

        return this.buildUnifiedFormattableResolution(
            `The text element has insufficient contrast of ${ratio}. Foreground color: ${foreground}, background color: ${background}). Modify the text foreground and/or background colors to provide a contrast ratio of at least 4.5:1 for regular text, or 3:1 for large text (at least 18pt, or 14pt+bold).`,
        );
    };

    private getColorValue(ruleResultsData: RuleResultsData, propertyName: string): string {
        let result = 'NO VALUE AVAILABLE';
        const value = ruleResultsData.props[propertyName] as string;

        const prefixSize = 2;
        if (value) {
            result = `#${value.substring(prefixSize)}`;
        }

        return result;
    }

    private getTouchSizeUnifiedFormattableResolution = (
        ruleResultsData: RuleResultsData,
    ): UnifiedFormattableResolution => {
        const dpi: number = ruleResultsData.props['Screen Dots Per Inch'];
        const boundingRect = ruleResultsData.props['boundsInScreen'];
        const physicalWidth: number = boundingRect['right'] - boundingRect['left'];
        const physicalHeight: number = boundingRect['bottom'] - boundingRect['top'];
        const logicalWidth = this.floorTo3Decimal(physicalWidth / dpi);
        const logicalHeight = this.floorTo3Decimal(physicalHeight / dpi);

        return this.buildUnifiedFormattableResolution(
            `The element has an insufficient target size (width: ${logicalWidth}dp, height: ${logicalHeight}dp). Set the element's minWidth and minHeight attributes to at least 48dp.`,
            ['minWidth', 'minHeight'],
        );
    };

    private buildUnifiedFormattableResolution(
        unformattedText: string,
        codeStrings: string[] = null,
    ): UnifiedFormattableResolution {
        return {
            howToFixSummary: unformattedText,
            howToFixFormat: { howToFix: unformattedText, formatAsCode: codeStrings },
        };
    }

    private includeColorContrastResult = (ruleResultsData: RuleResultsData): boolean => {
        return ruleResultsData.props['Confidence in Color Detection'] === 'High';
    };

    private includeAllResults = (ruleResultsData: RuleResultsData): boolean => {
        return true;
    };

    public getRuleInformation(ruleId: string): RuleInformation {
        const ruleInfo = this.supportedRules[ruleId];
        return ruleInfo || null;
    }

    private floorTo3Decimal(num: number): number {
        return Math.floor(num * 1000) / 1000;
    }
}
