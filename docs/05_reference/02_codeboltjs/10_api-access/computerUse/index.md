# Computer Use

Send desktop interaction requests to the current Codebolt environment.

## Example

```ts
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const status = await codebolt.computerUse.getStatus();
  console.log(status);
});
```

## SDK methods

### execute

```text
codebolt.computerUse.execute(request: ComputerUseRequest): Promise<ComputerUseServiceResponse>
```

### getStatus

```text
codebolt.computerUse.getStatus(): Promise<ComputerUseServiceResponse>
```

### getCapabilities

```text
codebolt.computerUse.getCapabilities(): Promise<ComputerUseServiceResponse>
```

### startSession

```text
codebolt.computerUse.startSession(sessionId?: string): Promise<ComputerUseServiceResponse>
```

### endSession

```text
codebolt.computerUse.endSession(sessionId: string): Promise<ComputerUseServiceResponse>
```

### observe

```text
codebolt.computerUse.observe(target?: ComputerUseTarget, params?: ComputerUseRequest["params"], sessionId?: string): Promise<ComputerUseServiceResponse>
```

### move

```text
codebolt.computerUse.move(point: { x: number; y: number; }, target?: ComputerUseTarget, sessionId?: string): Promise<ComputerUseServiceResponse>
```

### click

```text
codebolt.computerUse.click(params: NonNullable<ComputerUseRequest["params"]>, target?: ComputerUseTarget, sessionId?: string): Promise<ComputerUseServiceResponse>
```

### drag

```text
codebolt.computerUse.drag(from: { x: number; y: number; }, to: { x: number; y: number; }, target?: ComputerUseTarget, sessionId?: string): Promise<ComputerUseServiceResponse>
```

### scroll

```text
codebolt.computerUse.scroll(params: NonNullable<ComputerUseRequest["params"]>, target?: ComputerUseTarget, sessionId?: string): Promise<ComputerUseServiceResponse>
```

### typeText

```text
codebolt.computerUse.typeText(text: string, target?: ComputerUseTarget, sessionId?: string): Promise<ComputerUseServiceResponse>
```

### pressKeys

```text
codebolt.computerUse.pressKeys(keys: string[], target?: ComputerUseTarget, sessionId?: string): Promise<ComputerUseServiceResponse>
```

### readClipboard

```text
codebolt.computerUse.readClipboard(sessionId?: string): Promise<ComputerUseServiceResponse>
```

### writeClipboard

```text
codebolt.computerUse.writeClipboard(text: string, sessionId?: string): Promise<ComputerUseServiceResponse>
```

### listApplications

```text
codebolt.computerUse.listApplications(sessionId?: string): Promise<ComputerUseServiceResponse>
```

### launchApplication

```text
codebolt.computerUse.launchApplication(application: { applicationId?: string; applicationName?: string; urls?: string[]; }, sessionId?: string): Promise<ComputerUseServiceResponse>
```

### terminateApplication

```text
codebolt.computerUse.terminateApplication(processId: number): Promise<ComputerUseServiceResponse>
```

### listWindows

```text
codebolt.computerUse.listWindows(processId?: number, sessionId?: string): Promise<ComputerUseServiceResponse>
```

### focusWindow

```text
codebolt.computerUse.focusWindow(target: ComputerUseTarget, sessionId?: string): Promise<ComputerUseServiceResponse>
```

### setWindowBounds

```text
codebolt.computerUse.setWindowBounds(target: ComputerUseTarget, bounds: { x: number; y: number; width: number; height: number; }, sessionId?: string): Promise<ComputerUseServiceResponse>
```

### setElementValue

```text
codebolt.computerUse.setElementValue(target: ComputerUseTarget, value: string | number | boolean, sessionId?: string): Promise<ComputerUseServiceResponse>
```

### waitForState

```text
codebolt.computerUse.waitForState(target: ComputerUseTarget, conditions: Array<Record<string, unknown>>, options?: { timeoutMs?: number; stableSamples?: number; includeScreenshot?: boolean; }, sessionId?: string): Promise<ComputerUseServiceResponse>
```
