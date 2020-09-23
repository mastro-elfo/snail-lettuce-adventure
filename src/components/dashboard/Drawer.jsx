import React from "react";

import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";

import {
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  SwipeableDrawer
} from "@material-ui/core";

// see: https://material-ui.com/components/material-icons/
import GitHubIcon from "@material-ui/icons/GitHub";
import HelpIcon from "@material-ui/icons/Help";
import LogoIcon from "../Logo";
import SettingsIcon from "@material-ui/icons/Settings";

import { version } from "../version";

// const LISTS = [
//   // {
//   //   header: "ListSubheader",
//   //   items: [
//   // {type: 'divider'},
//   // {type: 'item', title: 'ItemName', href: '/', primary: '', secondary: '', Icon: IconName}
//   // ]
//   // }
//   {
//     items: [
//       {
//         type: "item",
//         title: i18n.t("dashboard:Drawer.settings"),
//         primary: i18n.t("dashboard:Drawer.settings"),
//         href: "/settings",
//         Icon: SettingsIcon
//       },
//       {
//         type: "item",
//         title: i18n.t("dashboard:Drawer.help"),
//         primary: i18n.t("dashboard:Drawer.help"),
//         href: "/help",
//         Icon: HelpIcon
//       },
//       {
//         type: "item",
//         primary: i18n.t("dashboard:Drawer.sla"),
//         secondary: `v${version.join(".")}`,
//         href: "/about",
//         Icon: LogoIcon
//       },
//       {
//         type: "item",
//         title: i18n.t("dashboard:Drawer.github"),
//         href: "https://github.com/mastro-elfo/snail-lettuce-adventure",
//         primary: "mastro-elfo",
//         secondary: "GitHub",
//         Icon: GitHubIcon
//       }
//     ]
//   }
// ];

const LARGER = false;

export default function DashboardDrawer({ open, onClose, onOpen }) {
  const { t } = useTranslation("dashboard");

  const LISTS = [
    {
      items: [
        {
          type: "item",
          title: t("dashboard:Drawer.settings"),
          primary: t("dashboard:Drawer.settings"),
          href: "/settings",
          Icon: SettingsIcon
        },
        {
          type: "item",
          title: t("dashboard:Drawer.help"),
          primary: t("dashboard:Drawer.help"),
          href: "/help",
          Icon: HelpIcon
        },
        {
          type: "item",
          title: t("dashboard:Drawer.sla"),
          primary: t("dashboard:Drawer.sla"),
          secondary: `v${version.join(".")}`,
          href: "/about",
          Icon: LogoIcon
        },
        {
          type: "item",
          title: t("dashboard:Drawer.github"),
          href: "https://github.com/mastro-elfo/snail-lettuce-adventure",
          primary: "mastro-elfo",
          secondary: "GitHub",
          Icon: GitHubIcon
        }
      ]
    }
  ];

  return (
    <SwipeableDrawer open={open} onClose={onClose} onOpen={onOpen}>
      {LISTS.map(({ header, items }, listIndex) => (
        <List
          key={listIndex}
          subheader={<ListSubheader>{header}</ListSubheader>}
        >
          {items.map((item, itemIndex) => (
            <DrawerItem key={itemIndex} {...item} />
          ))}
        </List>
      ))}
    </SwipeableDrawer>
  );
}

const DrawerItem = ({
  type,
  title,
  href,
  primary = "",
  secondary = "",
  Icon
}) => {
  if (!primary) {
    console.warn("DrawerItem alert: you didn't specify a `primary` prop");
  }
  const { push } = useHistory();

  if (type === "divider") {
    return <Divider />;
  } else if (type === "item") {
    const isLink = typeof href === "string" && !!href;
    const isExternal = isLink && href.startsWith("http");
    const isFn = typeof href === "function";
    return (
      <ListItem
        button={isLink}
        title={title}
        onClick={() =>
          isFn
            ? href()
            : isExternal
            ? window.open(href)
            : isLink
            ? push(href)
            : null
        }
      >
        {!!Icon && (
          <ListItemIcon>
            <Icon />
          </ListItemIcon>
        )}
        <ListItemText primary={primary} secondary={secondary} />
        {LARGER && (
          <ListItemIcon>
            <span />
          </ListItemIcon>
        )}
      </ListItem>
    );
  }
  return (
    <ListItem>
      <ListItemText primary={type} secondary="Unknown type" />
    </ListItem>
  );
};
