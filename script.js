const textArea = document.getElementById('editor');
const dropdownMenu = document.getElementById('dropdownMenu');

textArea.addEventListener('keydown', function(event) {
    if(event.key === 'Enter') {
        const regex = /\/1/;
        const value = textArea.innerText;
        // Test for a match
        const match = value.match(regex);

        if (match) {
            // prevent the default action if match is found
            event.preventDefault();
            let tag = 'h' + match[0].slice(-1);
            let text = value.substring(match.index + 2);
            let index = match.index;
            // let inputText = match.input;
            let inputText = match.input.slice(index);
            addHeading(tag, text, inputText);
        } else {
            console.log("No match found.");
        }
    }
});

function addHeading(tag, text, inputText){
    const heading = document.createElement(tag);
    const node = document.createTextNode(text);
    heading.appendChild(node);

    // Remove the text after /1
    traverseEditor(textArea, inputText)

    // Append the heading text 
    textArea.appendChild(heading);
    placeCursorAtEnd(textArea)
}

function traverseEditor(node, inputText) {
    node.childNodes.forEach(child => {
        if (child.nodeType === Node.ELEMENT_NODE) {
            traverseEditor(child, inputText);
        } else if(child.nodeType === Node.TEXT_NODE ) {
            node.textContent = node.textContent.replace(inputText, '');
        }
    })
}

// Function to place the cursor at the end of the heading
function placeCursorAtEnd(element) {
    const range = document.createRange();
    const selection = window.getSelection();
    range.selectNodeContents(element);
    range.collapse(false);
    // Clear the selection
    selection.removeAllRanges();
    selection.addRange(range); 
}

textArea.addEventListener('input', function(event){
    const text = editor.textContent;
    const inputSequence = '/1';
    
    if (text.endsWith(inputSequence)) {
        const selection = window.getSelection();

        if (selection.rangeCount > 0) {
            // Get the actual cursor range for the dropdowm
            const range = selection.getRangeAt(0).cloneRange();
            range.collapse(false);

            const dimensions = range.getBoundingClientRect();

            dropdownMenu.style.display = 'block';
            dropdownMenu.style.left = `${dimensions.left + window.scrollX}px`;
            dropdownMenu.style.top = `${dimensions.bottom + window.scrollY}px`;
        }
    } else {
        dropdownMenu.style.display = 'none';
    }
});


// Hide dropdown when clicking outside
document.addEventListener('click', function(event) {
    if (!editor.contains(event.target) && !dropdownMenu.contains(event.target)) {
        dropdownMenu.style.display = 'none';
    }
});
