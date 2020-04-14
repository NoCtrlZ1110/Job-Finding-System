module.exports = {
  // Mô tả chức năng của generator
  description: "Add an unconnected component",
  // Tạo ra một danh sách các tùy chọn các loại components
  prompts: [
    {
      type: "list",
      name: "type",
      message: "Select the type of component",
      default: "Stateless Function",
      choices: () => [
        "Stateless Function",
        "React.PureComponent",
        "React.Component",
      ],
    },
    {
      type: "input",
      name: "name",
      message: "What should it be called?",
      default: "Button",
      // Kiểm tra component đã tồn tại hay chưa
      validate: (value) => {
        if (/.+/.test(value)) {
          return componentExists(value)
            ? "A component or container with this name already exists"
            : true;
        }
        return "The name is required";
      },
    },
    {
      // Xác nhận thông qua câu hỏi yes/no
      type: "confirm",
      name: "wantMessages",
      default: true,
      message: "Do you want i18n messages (i.e. will this component use text)?",
    },
    {
      type: "confirm",
      name: "wantLoadable",
      default: false,
      message: "Do you want to load the component asynchronously?",
    },
  ],
  actions: (data) => {
    // Template tương ứng với các tùy chọn
    let componentTemplate;
    switch (data.type) {
      case "Stateless Function": {
        componentTemplate = "./component/stateless.js.hbs";
        break;
      }
      default: {
        componentTemplate = "./component/class.js.hbs";
      }
    }
    // Thực hiện việc tạo các file dựa trên template
    const actions = [
      {
        type: "add",
        path: "../app/components/{{properCase name}}/index.js",
        templateFile: componentTemplate,
        abortOnFail: true,
      },
      {
        type: "add",
        path: "../app/components/{{properCase name}}/tests/index.test.js",
        templateFile: "./component/index.test.js.hbs",
        abortOnFail: true,
      },
    ];
    if (data.wantMessages) {
      actions.push({
        type: "add",
        path: "../app/components/{{properCase name}}/messages.js",
        templateFile: "./component/messages.js.hbs",
        abortOnFail: true,
      });
    }
    if (data.wantLoadable) {
      actions.push({
        type: "add",
        path: "../app/components/{{properCase name}}/Loadable.js",
        templateFile: "./component/loadable.js.hbs",
        abortOnFail: true,
      });
    }
    actions.push({
      type: "prettify",
      path: "/components/",
    });
    return actions;
  },
};
