---
sidebar_position: 5
title: Publishing Templates
description: "Publish project template listings from the portal and understand current CLI support."
---
# Publishing Templates

Project template publishing is handled through the Codebolt portal.

The CLI does not currently publish or upload project template archives. Host the template ZIP first, then use the portal to create the template listing.

## Publish From The Portal

In the portal, open **Templates -> My Templates**, then use **Add Templates** to create a listing. The current portal form includes:

![My Templates](/img/mytemplates.png)

| Field | Meaning |
|---|---|
| **Template Title** | Name shown in template lists. |
| **Description** | Short explanation of what the template creates. |
| **Image** | Thumbnail shown in template lists and detail pages. The portal uploads this image. |
| **URL** | Direct ZIP download URL used by the Desktop App when creating a project. The portal stores this URL; it does not upload the ZIP archive. |
| **Type** | `template` for project templates or `app` for app templates. |

Your own templates appear under **My Templates**. Public templates appear under **All Templates**.

## Edit Or Delete A Template

From **My Templates**, you can edit or delete your listings.

Editing updates the title, description, thumbnail, URL, and type. Deleting removes the listing from **My Templates**.

## CLI Support

The current CLI supports `codebolt action` commands for:

- `agent`
- `tool`
- `provider`
- `plugin`
- `skill`
- `actionblock`
- `capability`
- `executor`

It does not currently provide a `template` action command such as:

```bash
codebolt action template publish
```

Use the portal flow above for project templates. The portal creates and manages the template listing, but the project template ZIP must already be hosted at the URL you enter. Use CLI publishing for the supported extension types.

## Use A Published Template In Desktop

After a template is published and available to the desktop template list:

1. open the Desktop App project dashboard
2. click **Create via Template**
3. choose **Templates** or **My Templates**
4. select the template
5. enter the project name
6. create the project

The Desktop App creates the project first, then downloads the template `url` into the new project folder.

## See Also

- [Creating Projects](03_creating-projects.md)
- [Creating a Template](04_creating-a-template.md)
- [Marketplace Publishing](02_marketplace-publishing.md)
