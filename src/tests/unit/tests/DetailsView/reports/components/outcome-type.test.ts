// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import { times } from 'lodash';

import { IManualTestStatus, ManualTestStatus } from '../../../../../../common/types/manual-test-status';
import { outcomeStatsFromManualTestStatus, outcomeTypeFromTestStatus } from '../../../../../../DetailsView/reports/components/outcome-type';

describe('OutcomeType', () => {

    it('translates fromTestStatus', () => {

        expect(outcomeTypeFromTestStatus(ManualTestStatus.PASS)).toEqual('pass');
        expect(outcomeTypeFromTestStatus(ManualTestStatus.FAIL)).toEqual('fail');
        expect(outcomeTypeFromTestStatus(ManualTestStatus.UNKNOWN)).toEqual('incomplete');

    });

    describe('outcomeStatsFromManualTestStatus', () => {

        it('works on empty set', () => {
            const stats = outcomeStatsFromManualTestStatus({});
            expect(stats).toEqual({ pass: 0, fail: 0, incomplete: 0 });
        });

        function generateManualTestStatus(pass: number, fail: number, incomplete: number): IManualTestStatus {
            let i = 0;
            const result: IManualTestStatus = {};
            function setStep(status) {
                return () => result['step' + ++i] = { stepFinalResult: status, isStepScanned: true };
            }
            times(pass, setStep(ManualTestStatus.PASS));
            times(fail, setStep(ManualTestStatus.FAIL));
            times(incomplete, setStep(ManualTestStatus.UNKNOWN));
            return result;
        }

        it('works on populated set', () => {
            const stats = outcomeStatsFromManualTestStatus(generateManualTestStatus(10, 20, 30));
            expect(stats).toEqual({ pass: 10, fail: 20, incomplete: 30 });
        });

    });

});