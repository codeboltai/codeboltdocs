# Dynamic Panels

Open, update, and close HTML panels in Codebolt.

## Example

```ts
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const panels = await codebolt.dynamicPanel.list();
  console.log(panels);
});
```

## SDK methods

### open

Opens a new DynamicPanel with the given HTML content.

```text
codebolt.dynamicPanel.open(panelId: string, title: string, html: string, opts?: DynamicPanelOpenOptions): Promise<DynamicPanelOpenResponse>
```

### update

Replaces the HTML content of an existing DynamicPanel.

```text
codebolt.dynamicPanel.update(panelId: string, html: string): Promise<DynamicPanelResponse>
```

### close

Closes a DynamicPanel and removes it from the UI.

```text
codebolt.dynamicPanel.close(panelId: string): Promise<DynamicPanelResponse>
```

### send

Pushes arbitrary data into the panel's iframe via `postMessage`.

```text
codebolt.dynamicPanel.send(panelId: string, data: any): Promise<DynamicPanelResponse>
```

### list

Lists all currently active DynamicPanels.

```text
codebolt.dynamicPanel.list(): Promise<DynamicPanelListResponse>
```

### onMessage

Registers a handler for messages coming **from** a specific panel's iframe.

```text
codebolt.dynamicPanel.onMessage(panelId: string, handler: (data: any) => void): void
```

### offMessage

Removes the message handler for a specific panel.

```text
codebolt.dynamicPanel.offMessage(panelId: string): void
```
