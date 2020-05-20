import React from "react";
import PropTypes from "prop-types";

import { prefix } from "prefix-si";
import { withRouter } from "react-router-dom";

import {
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  ListSubheader,
  Skeleton
} from "@material-ui/core";

import BrokenImageIcon from "@material-ui/icons/BrokenImage";
import DeleteIcon from "@material-ui/icons/Delete";

function SearchList({
  Action = null,
  onAction = () => {},
  icons,
  loading = false,
  results,
  searchTime = 0,
  skeleton = 0,
  history: { push }
}) {
  if (skeleton > 0 && loading) {
    return (
      <List subheader={<ListSubheader>Searching...</ListSubheader>}>
        {Array(skeleton)
          .fill(true)
          .map((_, i) => (
            <ListItem key={i}>
              <ListItemIcon>
                <Skeleton variant="circle" width={40} />
              </ListItemIcon>
              <ListItemText
                primary={<Skeleton height={40} />}
                secondary={<Skeleton />}
              />
            </ListItem>
          ))}
      </List>
    );
  } else if (results === null || results === undefined) {
    return <div />;
  } else {
    return (
      <List
        subheader={
          <ListSubheader>
            {`${results.length} ${
              results.length === 1 ? "result" : "results"
            }${searchTime !== null && " in " + prefix(searchTime / 1000, "s")}`}
          </ListSubheader>
        }
      >
        {results.map(r => (
          <ListItem
            key={r.uid}
            button
            onClick={() => push(`/${r.type.toLowerCase()}/v/${r.uid}`)}
          >
            {!!icons && (
              <ListItemIcon>
                {icons[r.type] ? icons[r.type] : <BrokenImageIcon />}
              </ListItemIcon>
            )}
            <ListItemText primary={r.primary} secondary={r.secondary} />
            {r.archived && (
              <ListItemIcon>
                <DeleteIcon />
              </ListItemIcon>
            )}
            {!!Action && (
              <ListItemSecondaryAction>
                <Action {...r} onAction={onAction} />
              </ListItemSecondaryAction>
            )}
          </ListItem>
        ))}
      </List>
    );
  }
}

SearchList.propTypes = {
  // Search in progress
  loading: PropTypes.bool,
  // Record type to an icon
  icons: PropTypes.object,
  // Array of results or null
  results: PropTypes.array,
  // Search time displayed in subheader
  searchTime: PropTypes.number,
  // Number of Skeleton to display while loading
  skeleton: PropTypes.number
};

export default withRouter(SearchList);
