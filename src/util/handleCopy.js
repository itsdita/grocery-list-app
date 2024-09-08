const generateListText = (list, amounts) => {
  return Object.keys(list)
    .map(
      (category) =>
        `${category}:\n${Object.keys(list[category])
          .map((item) => `• ${item}, ${amounts[category][item]}`)
          .join("\n")}`
    )
    .join("\n\n");
};

const copyToClipboard = (text) => {
  navigator.clipboard.writeText(text).then(
    () => {
      console.log("Text copied to clipboard");
    },
    (err) => {
      console.error("Failed to copy text: ", err);
    }
  );
};

export const handleCopy = (list, amounts) => {
  const listText = generateListText(list, amounts);
  copyToClipboard(listText);
  // Create and show notification
  showCopyNotification();
};

const showCopyNotification = () => {
  // Create a notification element
  const notification = document.createElement("div");
  notification.innerText = "List copied to clipboard!";
  notification.style.position = "fixed";
  notification.style.bottom = "20px";
  notification.style.right = "20px";
  notification.style.backgroundColor = "#4caf50";
  notification.style.color = "#fff";
  notification.style.padding = "10px 20px";
  notification.style.borderRadius = "5px";
  notification.style.boxShadow = "0 2px 5px rgba(0, 0, 0, 0.3)";
  notification.style.zIndex = "1000";
  notification.style.opacity = "0";
  notification.style.transition = "opacity 0.3s ease";

  document.body.appendChild(notification);

  // Fade in the notification
  setTimeout(() => {
    notification.style.opacity = "1";
  }, 10);

  // Automatically hide the notification after 3 seconds
  setTimeout(() => {
    notification.style.opacity = "0";
    // Remove the notification after it fades out
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 3000);
};
