htmx.defineExtension("submitjson", {
  onEvent: function (name, evt) {
    if (name === "htmx:configRequest") {
      evt.detail.headers["Content-Type"] = "application/json";
    }
  },
  encodeParameters: function (xhr, parameters, elt) {
    xhr.overrideMimeType("text/json");
    return (JSON.stringify({
      data: parameters,
    }));
  },
});

htmx.defineExtension("apifly", {
  onEvent: function (name, evt) {
    if (name === "htmx:configRequest") {
      evt.detail.headers["Content-Type"] = "application/json";
      evt.detail.path = "/api" + evt.detail.path;
      console.log(`apifly: ${evt.detail.path}`);
    }
  },
  encodeParameters: function (xhr, parameters, elt) {
    xhr.overrideMimeType("text/json");
    return (JSON.stringify({
      data: parameters,
    }));
  },
});

htmx.defineExtension("cmp", {
  onEvent: function (name, evt) {
    if (name === "htmx:configRequest") {
      evt.detail.path = "/component" + evt.detail.path;
      console.log(`cmp: ${evt.detail.path}`);
    }
  },
});
