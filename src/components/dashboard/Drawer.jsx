import React from "react";

import { useHistory } from "react-router-dom";

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

const LISTS = [
  // {
  //   header: "ListSubheader",
  //   items: [
  // {type: 'divider'},
  // {type: 'item', title: 'ItemName', href: '/', primary: '', secondary: '', Icon: IconName}
  // ]
  // }
  {
    items: [
      {
        type: "item",
        title: "Help",
        primary: "Help",
        href: "/help",
        Icon: HelpIcon
      },
      {
        type: "item",
        primary: "Snail Lettuce Adventure",
        secondary: "v1.0.0",
        Icon: LogoIcon
      },
      {
        type: "item",
        title: "Open repository",
        href: "https://github.com/mastro-elfo/snail-lettuce-adventure",
        primary: "mastro-elfo",
        secondary: "GitHub",
        Icon: GitHubIcon
      }
    ]
  }
];

const LARGER = false;

export default function DashboardDrawer({ open, onClose, onOpen }) {
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
  // TODO: add primary && secondary props
  // TODO: handle external links
  // TODO: add a callback instead of href
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
