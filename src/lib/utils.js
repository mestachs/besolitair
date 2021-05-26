export const pad = (num, size)  => ("000" + num).slice(size * -1);

export const sec2elapsed = (timeInMilliSeconds) =>  {

    const time = timeInMilliSeconds / 1000;
    const hours = Math.floor(time / 60 / 60);
    const minutes = Math.floor(time / 60) % 60;
    const seconds = Math.floor(time - minutes * 60);
  
    if (hours > 0) {
      return "started " + hours + " hours and " + minutes + " minutes ago";
    }
  
    if (minutes == 1) {
      return "started " + minutes + " minute and " + seconds + " seconds ago";
    }
  
    if (minutes > 0) {
      return "started " + minutes + " minutes and " + seconds + " seconds ago";
    }
  
    if (seconds > 0) {
      return "started " + seconds + " seconds ago";
    }
  
    return pad(hours, 2) + ":" + pad(minutes, 2) + ":" + pad(seconds, 2);
  }
  
  export const copyToClipboard = (str) => {
    const el = document.createElement("textarea");
    el.value = str;
    el.setAttribute("readonly", "");
    el.style.position = "absolute";
    el.style.left = "-9999px";
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
  };