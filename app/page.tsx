"use client";
import { useEffect, useState } from "react";

const themes = [
  { id: "chinese-theme", label: "山水田园", value: "chinese-garden" },
  { id: "tech-theme", label: "炫酷科技", value: "tech-futuristic" },
  { id: "cyber-theme", label: "赛博朋克", value: "cyberpunk" },
];

const navSections = [
  { id: "development", label: "开发工具" },
  { id: "design", label: "设计工具" },
  { id: "productivity", label: "效率工具" },
  { id: "security", label: "安全工具" },
  { id: "utilities", label: "实用工具" },
  { id: "ai", label: "AI工具" },
];

const toolsData = {
  development: [
    {
      name: "CodePen",
      desc: "在线代码编辑器，前端开发者的游乐场，实时预览HTML、CSS和JavaScript代码效果。",
      link: "https://codepen.io/",
    },
    {
      name: "JSFiddle",
      desc: "另一个流行的在线代码编辑器，支持多种前端框架和库，方便快速测试代码片段。",
      link: "https://jsfiddle.net/",
    },
    {
      name: "GitHub",
      desc: "全球最大的代码托管平台，支持版本控制和协作开发，开源项目的聚集地。",
      link: "https://github.com/",
    },
    {
      name: "Regex101",
      desc: "正则表达式测试工具，支持多种语言，提供详细的匹配解释和调试功能。",
      link: "https://regex101.com/",
    },
    {
      name: "JSON Formatter",
      desc: "JSON数据格式化工具，美化、验证和转换JSON数据，支持多种视图模式。",
      link: "https://jsonformatter.org/",
    },
    {
      name: "Postman",
      desc: "API开发和测试工具，支持请求发送、响应查看和自动化测试。",
      link: "https://www.postman.com/",
    },
  ],
  design: [
    {
      name: "Figma",
      desc: "基于浏览器的协作式UI设计工具，支持实时多人协作和原型设计。",
      link: "https://www.figma.com/",
    },
    {
      name: "Coolors",
      desc: "快速生成配色方案的工具，可以锁定喜欢的颜色并调整其他颜色来匹配。",
      link: "https://coolors.co/",
    },
    {
      name: "Adobe Color",
      desc: "Adobe出品的配色工具，支持多种配色规则和从图片中提取颜色。",
      link: "https://color.adobe.com/",
    },
  ],
  productivity: [
    {
      name: "Notion",
      desc: "一体化工作空间，集笔记、任务管理、数据库和协作功能于一身。",
      link: "https://www.notion.so/",
    },
    {
      name: "Trello",
      desc: "看板式项目管理工具，直观地组织和跟踪任务的进度。",
      link: "https://trello.com/",
    },
  ],
};

export default function Home() {
  const [theme, setTheme] = useState<string>("chinese-garden");
  const [activeSection, setActiveSection] = useState<string>("development");

  // 主题切换
  useEffect(() => {
    const saved = localStorage.getItem("selectedTheme") || "chinese-garden";
    setTheme(saved);
    const linkId = "theme-style-link";
    let link = document.getElementById(linkId) as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement("link");
      link.rel = "stylesheet";
      link.id = linkId;
      document.head.appendChild(link);
    }
    link.href = `/styles/${saved}.css`;
  }, []);

  useEffect(() => {
    const linkId = "theme-style-link";
    let link = document.getElementById(linkId) as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement("link");
      link.rel = "stylesheet";
      link.id = linkId;
      document.head.appendChild(link);
    }
    link.href = `/styles/${theme}.css`;
    localStorage.setItem("selectedTheme", theme);
  }, [theme]);

  // 导航高亮与平滑滚动
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY + 100;
      let current = "development";
      navSections.forEach((section) => {
        const el = document.getElementById(section.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollY >= top && scrollY < top + height) {
            current = section.id;
          }
        }
      });
      setActiveSection(current);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (id: string) => {
    setActiveSection(id);
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({
        top: el.offsetTop - 60,
        behavior: "smooth",
      });
    }
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* 侧边栏 */}
      <div className="sidebar">
        <div className="logo">
          <h1>工具集</h1>
          <p>随心切换您喜爱的风格</p>
        </div>
        <ul className="nav-menu">
          {navSections.map((item) => (
            <li
              key={item.id}
              className={"nav-item" + (activeSection === item.id ? " active" : "")}
            >
              <a
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.id);
                }}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
      {/* 主内容区 */}
      <div className="main-content">
        {navSections.map((section) => (
          <section key={section.id} id={section.id} style={{ marginBottom: 40 }}>
            <h2 className="section-title">{section.label}</h2>
            <div className="tools-grid">
              {(toolsData as any)[section.id]?.map((tool: any) => (
                <div className="tool-card" key={tool.name}>
                  <h3 className="tool-name">{tool.name}</h3>
                  <p className="tool-desc">{tool.desc}</p>
                  <a
                    href={tool.link}
                    className="tool-link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    访问工具
                  </a>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
      {/* 主题切换按钮 */}
      <div className="theme-switcher">
        {themes.map((t) => (
          <button
            key={t.id}
            className={"theme-btn" + (theme === t.value ? " active" : "")}
            id={t.id}
            data-theme={t.value}
            onClick={() => setTheme(t.value)}
            type="button"
          >
            <span className="theme-label">{t.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
