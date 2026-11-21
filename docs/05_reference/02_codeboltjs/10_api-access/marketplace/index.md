# Marketplace

Find items and manage their installation, configuration, and operation status.

## SDK methods

### search

```text
codebolt.marketplace.search(params: { type: MarketplaceItemType; query?: string; }): Promise<MarketplaceResult<MarketplaceCatalogItem[]>>
```

### getItem

```text
codebolt.marketplace.getItem(params: MarketplaceItemRef): Promise<MarketplaceResult<MarketplaceCatalogItem>>
```

### planInstall

```text
codebolt.marketplace.planInstall(params: MarketplaceItemRef): Promise<MarketplaceResult<{ item: MarketplaceItemRef; dependencies: unknown; }>>
```

### listInstalled

```text
codebolt.marketplace.listInstalled(params: { type: MarketplaceItemType; }): Promise<MarketplaceResult<{ installations: MarketplaceInstallation[]; }>>
```

### install

```text
codebolt.marketplace.install(params: MarketplaceInstallInput): Promise<MarketplaceResult<MarketplaceStatus>>
```

### getStatus

```text
codebolt.marketplace.getStatus(params: { operationId: string; }): Promise<MarketplaceResult<MarketplaceStatus>>
```

### listOperations

```text
codebolt.marketplace.listOperations(): Promise<MarketplaceResult<MarketplaceStatus[]>>
```

### getConfiguration

```text
codebolt.marketplace.getConfiguration(params: { installationId: string; }): Promise<MarketplaceResult<MarketplaceConfigurationView>>
```

### configure

Opens a schema-driven secure card.

```text
codebolt.marketplace.configure(params: { installationId: string; }): Promise<MarketplaceResult<MarketplaceStatus>>
```

### setEnabled

```text
codebolt.marketplace.setEnabled(params: { installationId: string; enabled: boolean; }): Promise<MarketplaceResult<unknown>>
```

### uninstall

```text
codebolt.marketplace.uninstall(params: { installationId: string; }): Promise<MarketplaceResult<unknown>>
```

### cancel

```text
codebolt.marketplace.cancel(params: { operationId: string; }): Promise<MarketplaceResult<MarketplaceStatus>>
```
