// THIS FILE IS FOR TELLING THE USER NOT TO USE THE CONSOLE.
// MAKE SURE TO ADD THIS BEFORE ANY OTHER JAVASCRIPT FILES!

// Set the styles for the warning.
const titleStyle = "font-size: 32px; color: #dc3545;";
const infoStyle = "font-size: 18px; color: #6c757d;";

// Log them to the console in large text, so that it can contrast out of other debugging logs.
console.log("%cStop!", titleStyle);
console.log(
	"%cThis feature is only to be used by developers.\nIf you came here to enable a feature, then it is a scam.",
	infoStyle
);

// Make a newline for other debugging statements.
console.log("\n");
