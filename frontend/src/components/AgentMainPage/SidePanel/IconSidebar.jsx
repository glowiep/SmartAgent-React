import { menuItems } from "../../../constants/sidebar-menu-items"

function IconSidebar() {
  return (
    <ul className="menu bg-base-200 content-center w-[75px] border-r-8 border-double">
    {menuItems.map((item, index) => (
      <li key={index}>
        <a className="tooltip tooltip-right mt-10" data-tip={item.tooltip}>
          {item.icon}
        </a>
      </li>
    ))}
  </ul>
  )
}

export default IconSidebar
