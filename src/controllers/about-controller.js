export const aboutController = {
    index: {
      handler: function (request, h) {
        const viewData = {
          title: "About Sports Grounds",
        };
        return h.view("about-view", viewData);
      },
    },
  };
  