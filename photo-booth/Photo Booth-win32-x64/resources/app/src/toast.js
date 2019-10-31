const toastr = require("toastr");

toastr.options = {
  closeButton: false,
  debug: false,
  newestOnTop: true,
  progressBar: false,
  positionClass: "toast-top-right",
  preventDuplicates: true,
  onclick: null,
  showDuration: "300",
  hideDuration: "1000",
  timeOut: "5000",
  extendedTimeOut: "1000",
  showEasing: "swing",
  hideEasing: "linear",
  showMethod: "fadeIn",
  hideMethod: "fadeOut"
};

exports.doToast = (title, msg, mode) => {
  switch (mode.toLowerCase()) {
    case "error":
      toastr.error(msg, title);
      break;
    case "warning":
      toastr.warning(msg, title);
      break;
    case "success":
      toastr.success(msg, title);
      break;
    default:
      toastr.info(msg, title);
      break;
  }
};
