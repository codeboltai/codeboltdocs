---
cbapicategory:
  - name: newPage
    link: /docs/api/apiaccess/browser/newPage
    description: Creates a new browser page or tab for web automation. Initializes a fresh browser context for isolated browsing sessions.
  - name: getUrl
    link: /docs/api/apiaccess/browser/getUrl
    description: Gets the current URL of the active browser page. Returns the complete URL including protocol, domain, path, and query parameters.
  - name: goToPage
    link: /docs/api/apiaccess/browser/goToPage
    description: Navigates the browser to a specific URL. Supports all protocols including HTTP, HTTPS, and file URLs.
  - name: screenshot
    link: /docs/api/apiaccess/browser/screenshot
    description: Captures a screenshot of the current page as base64 encoded image data. Useful for visual verification and debugging.
  - name: getHTML
    link: /docs/api/apiaccess/browser/getHTML
    description: Retrieves the complete HTML source code of the current page. Includes all elements, attributes, and embedded content.
  - name: getMarkdown
    link: /docs/api/apiaccess/browser/getMarkdown
    description: Converts the current page content to Markdown format. Intelligently transforms HTML structure to readable Markdown.
  - name: getContent
    link: /docs/api/apiaccess/browser/getContent
    description: "Extracts the visible text content from the current page. Returns human-readable text without HTML markup."
  - name: extractText
    link: /docs/api/apiaccess/browser/extractText
    description: Extracts clean, formatted text from the current page. Removes HTML tags and formatting for pure text extraction.
  - name: getSnapShot
    link: /docs/api/apiaccess/browser/getSnapShot
    description: Takes a visual snapshot of the current page. Similar to screenshot but with additional metadata and context.
  - name: getBrowserInfo
    link: /docs/api/apiaccess/browser/getBrowserInfo
    description: Gets detailed browser information including viewport dimensions, performance metrics, and page statistics.
  - name: scroll
    link: /docs/api/apiaccess/browser/scroll
    description: Scrolls the page in a specified direction by a given number of pixels. Supports both absolute and relative scrolling.
  - name: type
    link: /docs/api/apiaccess/browser/type
    description: "Types text into a specific input element on the page. Simulates human-like typing with optional delays."
  - name: click
    link: /docs/api/apiaccess/browser/click
    description: Clicks on a specific element using its element ID or selector. Triggers native click events and JavaScript handlers.
  - name: advanced interactions and diagnostics
    link: /docs/api/apiaccess/browser/advancedActions
    description: Documents locator-based actions, element queries, assertions, storage, cookies, network logging, tracing, profiling, recording, clipboard, uploads, downloads, and tab utilities.
  - name: enter
    link: /docs/api/apiaccess/browser/enter
    description: Simulates pressing the Enter key on the current page. Useful for form submissions and triggering actions.
  - name: search
    link: /docs/api/apiaccess/browser/search
    description: Performs a search by typing a query into a search input element. Automatically handles common search patterns.
  - name: close
    link: /docs/api/apiaccess/browser/close
    description: Closes the current browser page or tab. Properly cleans up resources and terminates the browser session.
  - name: getPDF
    link: /docs/api/apiaccess/browser/getPDF
    description: Retrieves PDF content from the current page. Extracts PDF data when browsing PDF documents directly.
  - name: pdfToText
    link: /docs/api/apiaccess/browser/pdfToText
    description: Converts PDF content on the current page to readable text. Extracts text content from PDF documents for processing.
  - name: listBrowserInstances
    link: /docs/api/apiaccess/browser/listInstances
    description: Lists all open browser instances with their status and metadata.
  - name: getBrowserInstance
    link: /docs/api/apiaccess/browser/getInstance
    description: Gets detailed information about a specific browser instance.
  - name: setActiveBrowserInstance
    link: /docs/api/apiaccess/browser/setActiveInstance
    description: Sets a browser instance as the active instance for subsequent operations.
  - name: openNewBrowserInstance
    link: /docs/api/apiaccess/browser/openNewInstance
    description: Creates a new browser instance for isolated browsing sessions.
  - name: closeBrowserInstance
    link: /docs/api/apiaccess/browser/closeInstance
    description: Closes a specific browser instance and cleans up its resources.
  - name: executeOnInstance
    link: /docs/api/apiaccess/browser/executeOnInstance
    description: Executes a browser operation on a specific instance.

---
# Browser API

The Browser API provides comprehensive web automation capabilities for CodeboltJS, enabling programmatic control of browser instances. You can navigate websites, interact with page elements, extract content, and capture screenshots for testing, scraping, and automation tasks.

<CBAPICategory />

## Key Features

### Instance Management
- **Active Instance Pattern**: Simple usage without explicit instance management
- **Multi-Instance Support**: Run multiple browser instances simultaneously
- **Instance Lifecycle**: Create, manage, and cleanup browser instances
- **Automatic Management**: Active instance tracking and automatic creation

### Navigation
- **Page Creation**: Initialize new browser pages with `newPage()`
- **URL Navigation**: Navigate to any URL with `goToPage()`
- **URL Retrieval**: Get current page URL with `getUrl()`
- **Page Management**: Close pages and clean up resources with `close()`

### Content Extraction
- **HTML Source**: Get complete HTML with `getHTML()`
- **Text Content**: Extract visible text with `getContent()`
- **Clean Text**: Get formatted text without HTML with `extractText()`
- **Markdown**: Convert pages to Markdown with `getMarkdown()`
- **PDF Handling**: Extract PDF content with `getPDF()` and `pdfToText()`

### User Interaction
- **Clicking**: Click elements with `click()`
- **Locator Queries**: Find elements with `find()`, read values with `get()`, and check state with `is()`
- **Typing**: Input text with `type()`
- **Searching**: Perform searches with `search()`
- **Key Presses**: Simulate Enter key with `enter()`
- **Scrolling**: Scroll pages with `scroll()`
- **Form Controls**: Use `focus()`, `press()`, `check()`, `uncheck()`, and `select()` for precise form automation

### Diagnostics and Browser State
- **Storage and Cookies**: Read and mutate `localStorage`, `sessionStorage`, and browser cookies
- **Network Inspection**: Start network capture, read requests, generate HAR output, and clear captured entries
- **Debug Artifacts**: Capture console output, page errors, traces, profiler data, and page recordings
- **Tabs and Files**: Manage tabs, upload files, download files, and use the system clipboard

### Visual Capture
- **Screenshots**: Capture page visuals with `screenshot()`
- **Snapshots**: Take detailed snapshots with `getSnapShot()`
- **Browser Info**: Get viewport and performance data with `getBrowserInfo()`

## Usage Patterns

### Active Instance Pattern (Recommended for LLM Usage)

```js
import codebolt from '@codebolt/codeboltjs';

// Simple usage - no instance management needed
await codebolt.browser.goToPage('https://example.com');
const content = await codebolt.browser.getContent();
await codebolt.browser.screenshot();

// Active instance is automatically managed
```

### Multi-Instance Pattern (Advanced Control)

```js
// Create and manage specific instances
const instance1 = await codebolt.openNewBrowserInstance();
const instance2 = await codebolt.openNewBrowserInstance();

// Execute on specific instances
await codebolt.browser.goToPage('https://example.com', { 
  instanceId: instance1.instanceId 
});
await codebolt.browser.goToPage('https://google.com', { 
  instanceId: instance2.instanceId 
});

// List all instances
const instances = await codebolt.listBrowserInstances();
console.log('Active instances:', instances);

// Set active instance
await codebolt.setActiveBrowserInstance(instance1.instanceId);

// Cleanup
await codebolt.closeBrowserInstance(instance1.instanceId);
await codebolt.closeBrowserInstance(instance2.instanceId);
```

## Quick Start Guide

### Basic Browser Automation

```js
import codebolt from '@codebolt/codeboltjs';

// Wait for connection and create new page
await codebolt.waitForReady();
await codebolt.browser.newPage();
console.log('✅ Browser page created');

// Navigate to a website
await codebolt.browser.goToPage('https://example.com');
console.log('✅ Navigated to website');

// Get current URL
const url = await codebolt.browser.getUrl();
console.log('Current URL:', url.payload.currentUrl);

// Extract page content
const content = await codebolt.browser.getContent();
console.log('Page content length:', content.payload.content.length);

// Take a screenshot
const screenshot = await codebolt.browser.screenshot();
console.log('✅ Screenshot captured');

// Close the browser
codebolt.browser.close();
console.log('✅ Browser closed');
```

### Web Scraping Workflow

```js
// Navigate to target website
await codebolt.browser.newPage();
await codebolt.browser.goToPage('https://example.com/products');

// Wait for page to load
await new Promise(resolve => setTimeout(resolve, 2000));

// Extract product information
const content = await codebolt.browser.getContent();
const products = content.payload.content;

// Save to file
await codebolt.fs.createFile('products.txt', products, './data');
console.log('✅ Products scraped and saved');

codebolt.browser.close();
```

### Form Automation Workflow

```js
// Navigate to form
await codebolt.browser.newPage();
await codebolt.browser.goToPage('https://example.com/contact');

// Fill out form fields
await codebolt.browser.type('input[name="name"]', 'John Doe');
await codebolt.browser.type('input[name="email"]', 'john@example.com');
await codebolt.browser.type('textarea[name="message"]', 'Hello, World!');

// Submit form
await codebolt.browser.enter();

// Wait for submission
await new Promise(resolve => setTimeout(resolve, 3000));

// Verify submission
const url = await codebolt.browser.getUrl();
console.log('Redirected to:', url.payload.currentUrl);

codebolt.browser.close();
```

## Common Workflows

### Complete Scraping Session
```js
async function scrapeWebsite(url) {
    // Setup
    await codebolt.browser.newPage();
    await codebolt.browser.goToPage(url);

    // Wait for page load
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Extract content
    const content = await codebolt.browser.getContent();
    const html = await codebolt.browser.getHTML();
    const markdown = await codebolt.browser.getMarkdown();

    // Take screenshot
    const screenshot = await codebolt.browser.screenshot();

    // Save results
    await codebolt.fs.createFile('content.txt', content.payload.content, './output');
    await codebolt.fs.createFile('page.html', html.payload.content, './output');
    await codebolt.fs.createFile('page.md', markdown.payload.content, './output');

    // Cleanup
    codebolt.browser.close();

    return { content, html, markdown, screenshot };
}

// Usage
await scrapeWebsite('https://example.com');
```

### Multi-Page Navigation
```js
async function navigateMultiplePages(pages) {
    const results = [];

    for (const page of pages) {
        await codebolt.browser.newPage();
        await codebolt.browser.goToPage(page.url);

        await new Promise(resolve => setTimeout(resolve, 2000));

        const content = await codebolt.browser.getContent();
        results.push({
            url: page.url,
            title: page.title,
            content: content.payload.content
        });

        codebolt.browser.close();
    }

    return results;
}

// Usage
const pages = [
    { url: 'https://example.com/page1', title: 'Page 1' },
    { url: 'https://example.com/page2', title: 'Page 2' },
    { url: 'https://example.com/page3', title: 'Page 3' }
];

const scrapedPages = await navigateMultiplePages(pages);
```

### Screenshot Capture Workflow
```js
async function captureScreenshots(urls) {
    const screenshots = [];

    for (const url of urls) {
        await codebolt.browser.newPage();
        await codebolt.browser.goToPage(url);

        // Wait for page to fully load
        await new Promise(resolve => setTimeout(resolve, 3000));

        // Capture screenshot
        const screenshot = await codebolt.browser.screenshot();
        screenshots.push({
            url,
            screenshot: screenshot.payload.screenshot,
            timestamp: new Date().toISOString()
        });

        codebolt.browser.close();
    }

    return screenshots;
}

// Usage
const urls = ['https://example.com', 'https://github.com', 'https://stackoverflow.com'];
const screenshots = await captureScreenshots(urls);
```

### Search and Extract Workflow
```js
async function searchAndExtract(query, searchUrl) {
    // Navigate to search page
    await codebolt.browser.newPage();
    await codebolt.browser.goToPage(searchUrl);

    // Perform search
    await codebolt.browser.search('input[name="q"]', query);
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Extract search results
    const content = await codebolt.browser.getContent();
    const lines = content.payload.content.split('\n');

    const results = lines.filter(line =>
        line.includes('http') || line.includes('www.')
    );

    console.log(`Found ${results.length} search results`);

    codebolt.browser.close();
    return results;
}

// Usage
const results = await searchAndExtract('web automation', 'https://google.com');
```

### PDF Extraction Workflow
```js
async function extractPDFContent(pdfUrl) {
    // Navigate to PDF
    await codebolt.browser.newPage();
    await codebolt.browser.goToPage(pdfUrl);

    // Wait for PDF to load
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Extract PDF content
    const pdfContent = await codebolt.browser.getPDF();
    const textContent = await codebolt.browser.pdfToText();

    // Save extracted text
    await codebolt.fs.createFile(
        'extracted-text.txt',
        textContent.payload.content,
        './output'
    );

    console.log('✅ PDF content extracted');

    codebolt.browser.close();
    return { pdfContent, textContent };
}

// Usage
await extractPDFContent('https://example.com/document.pdf');
```

## Module Integration Examples

### Integration with File System Module
```js
// Scrape data and save to files
await codebolt.browser.newPage();
await codebolt.browser.goToPage('https://example.com/data');

const content = await codebolt.browser.getContent();

// Save raw content
await codebolt.fs.createFile('raw-data.txt', content.payload.content, './scraped-data');

// Save as JSON
const jsonData = JSON.stringify({
    url: 'https://example.com/data',
    content: content.payload.content,
    timestamp: new Date().toISOString()
}, null, 2);

await codebolt.fs.createFile('data.json', jsonData, './scraped-data');

console.log('✅ Data saved to multiple files');

codebolt.browser.close();
```

### Integration with Terminal Module
```js
// Start local server and test with browser
const serverEmitter = codebolt.terminal.executeCommandWithStream('npm start');

// Wait for server to be ready
serverEmitter.on('commandOutput', (data) => {
    if (data.output.includes('Server running')) {
        // Open browser to test
        setTimeout(async () => {
            await codebolt.browser.newPage();
            await codebolt.browser.goToPage('http://localhost:3000');

            // Take screenshot for verification
            await codebolt.browser.screenshot();
            console.log('✅ Server tested with screenshot');

            codebolt.browser.close();
        }, 1000);
    }
});
```

### Integration with Git Module
```js
// Scrape documentation and commit to git
await codebolt.browser.newPage();
await codebolt.browser.goToPage('https://docs.example.com');

const markdown = await codebolt.browser.getMarkdown();

// Save scraped documentation
await codebolt.fs.createFile('scraped-docs.md', markdown.payload.content, './docs');

// Commit to git
await codebolt.git.addAll();
await codebolt.git.commit('docs: update scraped documentation');

console.log('✅ Documentation scraped and committed');

codebolt.browser.close();
```

## Advanced Usage Patterns

### Smart Waiting Strategy
```js
async function smartWait() {
    // Navigate to page
    await codebolt.browser.goToPage('https://example.com');

    // Wait for network idle
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Check if page is fully loaded
    const info = await codebolt.browser.getBrowserInfo();
    console.log('Page loaded:', info.payload);

    // Additional wait if needed
    if (info.payload.viewport) {
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
}
```

### Retry Logic for Navigation
```js
async function navigateWithRetry(url, maxRetries = 3) {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            await codebolt.browser.goToPage(url);
            await new Promise(resolve => setTimeout(resolve, 2000));

            const currentUrl = await codebolt.browser.getUrl();
            if (currentUrl.payload.currentUrl.includes(url.split('/')[2])) {
                console.log('✅ Navigation successful');
                return true;
            }
        } catch (error) {
            console.error(`Attempt ${attempt} failed:`, error.message);

            if (attempt === maxRetries) {
                throw new Error('Navigation failed after retries');
            }

            await new Promise(resolve => setTimeout(resolve, 1000));
        }
    }
}

// Usage
await navigateWithRetry('https://example.com');
```

### Batch Content Extraction
```js
async function extractMultipleFormats(url) {
    await codebolt.browser.newPage();
    await codebolt.browser.goToPage(url);

    await new Promise(resolve => setTimeout(resolve, 2000));

    // Extract all formats
    const [content, html, markdown, screenshot] = await Promise.all([
        codebolt.browser.getContent(),
        codebolt.browser.getHTML(),
        codebolt.browser.getMarkdown(),
        codebolt.browser.screenshot()
    ]);

    const extraction = {
        url,
        timestamp: new Date().toISOString(),
        content: content.payload.content,
        html: html.payload.content,
        markdown: markdown.payload.content,
        screenshot: screenshot.payload.screenshot
    };

    codebolt.browser.close();
    return extraction;
}

// Usage
const data = await extractMultipleFormats('https://example.com');
```

### Progressive Image Loading
```js
async function captureScrollingScreenshots(url) {
    await codebolt.browser.newPage();
    await codebolt.browser.goToPage(url);

    await new Promise(resolve => setTimeout(resolve, 2000));

    const screenshots = [];
    const maxScrolls = 5;

    for (let i = 0; i < maxScrolls; i++) {
        // Capture current viewport
        const screenshot = await codebolt.browser.screenshot();
        screenshots.push(screenshot.payload.screenshot);

        // Scroll down
        await codebolt.browser.scroll('down', 500);

        // Wait for content to load
        await new Promise(resolve => setTimeout(resolve, 1000));
    }

    codebolt.browser.close();
    return screenshots;
}

// Usage
const screenshots = await captureScrollingScreenshots('https://example.com/long-page');
```

## Error Handling

### Comprehensive Browser Automation Error Handling
```js
async function safeBrowserAutomation(url) {
    let pageCreated = false;

    try {
        // Create page
        await codebolt.browser.newPage();
        pageCreated = true;
        console.log('✅ Browser page created');

        // Navigate with timeout
        const navigationPromise = codebolt.browser.goToPage(url);
        const timeoutPromise = new Promise((_, reject) =>
            setTimeout(() => reject(new Error('Navigation timeout')), 10000)
        );

        await Promise.race([navigationPromise, timeoutPromise]);
        console.log('✅ Navigation successful');

        // Wait for page load
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Verify navigation
        const currentUrl = await codebolt.browser.getUrl();
        if (!currentUrl.payload.currentUrl.includes(url.split('/')[2])) {
            throw new Error('Navigation verification failed');
        }

        // Extract content
        const content = await codebolt.browser.getContent();
        console.log('✅ Content extracted');

        return content;

    } catch (error) {
        console.error('❌ Browser automation error:', error.message);

        // Handle specific errors
        if (error.message.includes('Navigation timeout')) {
            console.error('💡 Page took too long to load');
        } else if (error.message.includes('net::ERR_NAME_NOT_RESOLVED')) {
            console.error('💡 DNS resolution failed - check URL');
        }

        throw error;

    } finally {
        // Always cleanup
        if (pageCreated) {
            try {
                codebolt.browser.close();
                console.log('✅ Browser cleaned up');
            } catch (cleanupError) {
                console.error('⚠️ Cleanup error:', cleanupError.message);
            }
        }
    }
}

// Usage
await safeBrowserAutomation('https://example.com');
```

## Performance Considerations

### Optimizing Browser Operations
```js
// Reuse browser page for multiple operations
async function efficientScraping(urls) {
    await codebolt.browser.newPage();

    const results = [];

    for (const url of urls) {
        await codebolt.browser.goToPage(url);
        await new Promise(resolve => setTimeout(resolve, 1000));

        const content = await codebolt.browser.getContent();
        results.push({ url, content: content.payload.content });
    }

    codebolt.browser.close();
    return results;
}

// Parallel extraction (multiple pages)
async function parallelExtraction(urls) {
    const promises = urls.map(async (url) => {
        await codebolt.browser.newPage();
        await codebolt.browser.goToPage(url);

        await new Promise(resolve => setTimeout(resolve, 1000));

        const content = await codebolt.browser.getContent();
        codebolt.browser.close();

        return { url, content: content.payload.content };
    });

    return await Promise.all(promises);
}
```

### Memory Management
```js
// Clean up resources properly
async function resourceIntensiveScraping(urls) {
    const batchSize = 5;

    for (let i = 0; i < urls.length; i += batchSize) {
        const batch = urls.slice(i, i + batchSize);

        await codebolt.browser.newPage();

        for (const url of batch) {
            await codebolt.browser.goToPage(url);

            // Extract minimal data
            const content = await codebolt.browser.getContent();
            await codebolt.fs.createFile(
                `${Date.now()}.txt`,
                content.payload.content,
                './scraped-data'
            );
        }

        // Cleanup after each batch
        codebolt.browser.close();

        // Force garbage collection pause
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
}
```

## Common Pitfalls and Solutions

### Pitfall 1: Not Waiting for Page Load
```js
// ❌ Bad: Doesn't wait for page load
await codebolt.browser.goToPage('https://example.com');
const content = await codebolt.browser.getContent();

// ✅ Good: Waits for page load
await codebolt.browser.goToPage('https://example.com');
await new Promise(resolve => setTimeout(resolve, 2000));
const content = await codebolt.browser.getContent();
```

### Pitfall 2: Not Cleaning Up Resources
```js
// ❌ Bad: Leaves browser open
await codebolt.browser.newPage();
await codebolt.browser.goToPage('https://example.com');
// Forget to close...

// ✅ Good: Always cleanup
try {
    await codebolt.browser.newPage();
    await codebolt.browser.goToPage('https://example.com');
    // Do work...
} finally {
    codebolt.browser.close();
}
```

### Pitfall 3: Ignoring Navigation Failures
```js
// ❌ Bad: Assumes navigation succeeded
await codebolt.browser.goToPage('https://example.com');
const content = await codebolt.browser.getContent();

// ✅ Good: Verify navigation
await codebolt.browser.goToPage('https://example.com');
const url = await codebolt.browser.getUrl();
if (url.payload.currentUrl.includes('example.com')) {
    const content = await codebolt.browser.getContent();
} else {
    throw new Error('Navigation failed');
}
```

### Pitfall 4: Not Handling Dynamic Content
```js
// ❌ Bad: Doesn't account for dynamic loading
await codebolt.browser.goToPage('https://example.com');
const content = await codebolt.browser.getContent();

// ✅ Good: Wait for dynamic content
await codebolt.browser.goToPage('https://example.com');

// Wait for specific element or timeout
await new Promise(resolve => setTimeout(resolve, 3000));

const content = await codebolt.browser.getContent();
```

## Best Practices

### 1. Always Wait for Page Load
```js
await codebolt.browser.goToPage(url);
await new Promise(resolve => setTimeout(resolve, 2000));
```

### 2. Verify Navigation Success
```js
const currentUrl = await codebolt.browser.getUrl();
if (!currentUrl.payload.currentUrl.includes(expectedDomain)) {
    throw new Error('Navigation failed');
}
```

### 3. Use Proper Error Handling
```js
try {
    await codebolt.browser.newPage();
    await codebolt.browser.goToPage(url);
    // Do work...
} catch (error) {
    console.error('Browser error:', error);
} finally {
    codebolt.browser.close();
}
```

### 4. Clean Up Resources
```js
const page = await codebolt.browser.newPage();
try {
    // Work with page
} finally {
    codebolt.browser.close();
}
```

### 5. Handle Dynamic Content
```js
await codebolt.browser.goToPage(url);

// Wait for specific content
let attempts = 0;
while (attempts < 10) {
    const content = await codebolt.browser.getContent();
    if (content.payload.content.includes('expected-text')) {
        break;
    }
    await new Promise(resolve => setTimeout(resolve, 500));
    attempts++;
}
```

## Troubleshooting

### Common Issues and Solutions

**Issue**: Page not loading completely
- **Solution**: Increase wait time or implement smart waiting for specific elements

**Issue**: Content extraction returns empty
- **Solution**: Verify page has fully loaded and check for JavaScript-rendered content

**Issue**: Screenshots are blank
- **Solution**: Ensure page has fully loaded before capturing

**Issue**: Navigation timeout
- **Solution**: Check network connectivity and URL validity

**Issue**: Elements not found for interaction
- **Solution**: Verify element selectors and wait for page load

**Issue**: Browser not closing properly
- **Solution**: Always call close() in finally blocks

## Response Structure

All browser API functions return responses with a consistent structure:

```js
{
  event: 'browserActionResponse',
  eventId: 'actionName_timestamp',
  payload: {
    content: 'response data',
    viewport: { width: 767, height: 577 },
    currentUrl: 'https://current-page-url.com'
  },
  type: 'specificResponseType',
  success: true,
  message: 'Operation completed'
}
```
