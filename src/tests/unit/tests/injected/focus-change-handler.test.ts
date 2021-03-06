// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import { IMock, It, Mock, Times } from 'typemoq';

import { TargetPageStoreData } from '../../../../injected/client-store-listener';
import { FocusChangeHandler } from '../../../../injected/focus-change-handler';
import { ScrollingController, ScrollingWindowMessage } from '../../../../injected/frameCommunicators/scrolling-controller';
import { TargetPageActionMessageCreator } from '../../../../injected/target-page-action-message-creator';

describe('FocusChangeHandler', () => {
    let targetPageActionMessageCreatorMock: IMock<TargetPageActionMessageCreator>;
    let scrollingControllerMock: IMock<ScrollingController>;
    let testSubject: FocusChangeHandler;
    let sampleTarget: string[];
    let sampleMessage: ScrollingWindowMessage;

    beforeEach(() => {
        targetPageActionMessageCreatorMock = Mock.ofType<TargetPageActionMessageCreator>();
        scrollingControllerMock = Mock.ofType<ScrollingController>();
        sampleTarget = ['some', 'target'];
        sampleMessage = {
            focusedTarget: sampleTarget,
        };

        testSubject = new FocusChangeHandler(targetPageActionMessageCreatorMock.object, scrollingControllerMock.object);
    });

    test('onStoreChange: new target is null', () => {
        const storeData: TargetPageStoreData = {
            visualizationStoreData: {
                focusedTarget: null,
            },
        } as TargetPageStoreData;

        targetPageActionMessageCreatorMock.setup(acm => acm.scrollRequested()).verifiable(Times.never());
        scrollingControllerMock.setup(scm => scm.processRequest(It.isAny())).verifiable(Times.never());

        testSubject.handleFocusChangeWithStoreData(storeData);

        targetPageActionMessageCreatorMock.verifyAll();
        scrollingControllerMock.verifyAll();
    });

    test('onStoreChange: new target is not null', () => {
        const storeData: TargetPageStoreData = {
            visualizationStoreData: {
                focusedTarget: sampleTarget,
            },
        } as TargetPageStoreData;

        targetPageActionMessageCreatorMock.setup(acm => acm.scrollRequested()).verifiable(Times.once());
        scrollingControllerMock.setup(scm => scm.processRequest(sampleMessage)).verifiable(Times.once());

        testSubject.handleFocusChangeWithStoreData(storeData);

        targetPageActionMessageCreatorMock.verifyAll();
        scrollingControllerMock.verifyAll();
    });

    test('onStoreChange: new target and old target are same', () => {
        const storeData: TargetPageStoreData = {
            visualizationStoreData: {
                focusedTarget: sampleTarget,
            },
        } as TargetPageStoreData;

        targetPageActionMessageCreatorMock.setup(acm => acm.scrollRequested()).verifiable(Times.once());
        scrollingControllerMock.setup(scm => scm.processRequest(sampleMessage)).verifiable(Times.once());

        testSubject.handleFocusChangeWithStoreData(storeData);

        targetPageActionMessageCreatorMock.verifyAll();
        scrollingControllerMock.verifyAll();

        targetPageActionMessageCreatorMock.reset();
        scrollingControllerMock.reset();

        targetPageActionMessageCreatorMock.setup(acm => acm.scrollRequested()).verifiable(Times.never());
        scrollingControllerMock.setup(scm => scm.processRequest(It.isAny())).verifiable(Times.never());

        testSubject.handleFocusChangeWithStoreData(storeData);

        targetPageActionMessageCreatorMock.verifyAll();
        scrollingControllerMock.verifyAll();
    });
});
