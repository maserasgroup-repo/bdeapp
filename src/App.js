import React from "react";
import {
  AppBar,
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  DialogActions,
  Grid,
  Grow,
  Icon,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
  withStyles
} from "@material-ui/core";
import { Add, Delete, FileCopy } from "@material-ui/icons";
import "./index.css";
import computeDescriptors from "./compute";
import classNames from "classnames";
import { loadCSS } from "fg-loadcss/src/loadCSS";

const styles = theme => ({
  grow: {
    flexGrow: 1
  },
  layout: {
    flexGrow: 1,
    width: "auto",
    display: "block", // Fix IE11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(800 + theme.spacing.unit * 3 * 2)]: {
      width: "80%",
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 4,
    marginBottom: theme.spacing.unit * 4,
    paddingBottom: theme.spacing.unit * 2,
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  extendedFab: {
    marginLeft: theme.spacing.unit
  },
  topFab: {
    margin: theme.spacing.unit
  },
  paddedTitle: {
    marginBottom: theme.spacing.unit * 2
  },
  center: {
    textAlign: "center",
    alignItems: "center"
  },
  footer: {
    marginTop: theme.spacing.unit * 4,
    marginBottom: theme.spacing.unit
  },
  icon: {
    verticalAlign: "middle",
    marginRight: theme.spacing.unit
  },
  link: {
    textDecoration: "none",
    color: theme.palette.primary.main,
    cursor: "pointer"
  },
  separator: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  }
});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.classes = props.classes;
    this.media = {
      water: {
        ligand: {
          header: [
            "Your ligand(s)",
            ["FeCl", <sub>2</sub>, <sup>+</sup>],
            ["MnO", <sub>3</sub>, <sup>+</sup>],
            ["W(CO)", <sub>5</sub>],
            ["ZrCl", <sub>5</sub>, <sup>-</sup>],
            ["HgI", <sub>2</sub>]
          ],
          weights: [
            [
              // FeCl
              -9.57e-5,
              -0.0007779798,
              0.008334381,
              0.0012725377,
              0.0104595956
            ],
            [
              // MnO
              -0.0014347238,
              -0.001264999,
              -0.0014086146,
              -0.0112683125,
              -0.0106811005
            ],
            [
              // WCO
              -0.0006641604,
              0.0120263372,
              -0.0045691142,
              0.0143800929,
              0.0102959932
            ],
            [
              // ZrCl
              -0.0004656456,
              -0.0082425979,
              -0.0085413411,
              0.0123642104,
              0.0060195296
            ],
            [
              // HgI
              -0.0001578893,
              0.001264534,
              0.0026525622,
              0.0062846997,
              -0.0134778904
            ],
            [
              // independent term
              -0.0062596039,
              0.0050016996,
              0.0451941129,
              -0.0058735631,
              -0.2316419222
            ]
          ]
        },
        metal: {
          header: [
            "Your metallic cofactor(s)",
            ["Cl", <sup>-</sup>],
            "CO",
            ["C", <sub>6</sub>, "H", <sub>5</sub>, <sup>-</sup>],
            ["O", <sup>2-</sup>],
            ["C", <sub>6</sub>, "H", <sub>4</sub>, "OMe", <sup>-</sup>]
          ],
          weights: [
            [
              // Cl
              0.0006687317,
              0.0011095867,
              0.0088471175,
              0.0189701685,
              -0.020378295
            ],
            [
              // CO
              0.0001874184,
              -0.0048469364,
              0.0060299296,
              -0.0007216421,
              -0.0085463645
            ],
            [
              // C6H5-
              0.0009591169,
              -0.0048027196,
              0.003030465,
              -0.0026819672,
              0.0211107271
            ],
            [
              // O2-
              0.0003267515,
              0.0044468402,
              0.0023381813,
              -0.0016501179,
              -0.0010446671
            ],
            [
              // C6H4OMe−
              0.0004390254,
              -0.0014948412,
              -0.0115530296,
              -0.0010916596,
              -0.0071786809
            ],
            [
              // independent term
              0.0014124172,
              -0.0408005953,
              -0.1393570241,
              0.1834110805,
              0.256521314
            ]
          ]
        }
      },
      vacuum: {
        ligand: {
          header: [
            "Your ligand(s)",
            ["AuPH", <sub>3</sub>, <sup>+</sup>],
            ["Cu(NH", <sub>3</sub>, ")", <sub>3</sub>, <sup>2+</sup>],
            ["OsO", <sub>3</sub>, <sup>2+</sup>],
            ["PtF", <sub>5</sub>, <sup>-</sup>],
            ["Ru(SH)", <sub>4</sub>],
            ["TiCl", <sub>3</sub>]
          ],
          // obtained from ESI table S24
          weights: [
            [
              // Au
              -0.0000772552,
              0.0019317413,
              -0.0017217058,
              0.0025846033,
              0.0072391719,
              0.0220593816
            ],
            [
              // Cu
              -0.0003868597,
              -0.0032147086,
              0.0005639329,
              0.0123850745,
              -0.005229837,
              -0.002884931
            ],
            [
              // Os
              -0.0001395635,
              0.0004412619,
              -0.0032287924,
              -0.0021541268,
              0.0003919718,
              -0.0085726989
            ],
            [
              // Pt
              -0.0000383948,
              0.0036048507,
              0.0009461012,
              0.003000505,
              -0.013915797,
              0.0035188363
            ],
            [
              // Ru
              -0.0001392313,
              0.0019712987,
              0.0055579601,
              0.0032420026,
              0.0197389414,
              -0.0200861539
            ],
            [
              // Ti
              -0.0001187452,
              0.000159655,
              0.004875293,
              -0.0130585729,
              -0.0079242451,
              0.008610508
            ],
            [
              // independent term
              0.0021848302,
              -0.0090176047,
              0.0253814256,
              -0.0517956187,
              -0.3576429801,
              -0.2078832521
            ]
          ]
        },
        metal: {
          header: [
            "Your metallic cofactor(s)",
            ["Cl", <sup>-</sup>],
            ["H", <sub>2</sub>, "O"],
            ["H", <sup>-</sup>],
            ["O", <sub>2</sub>, <sup>-</sup>],
            ["C", <sub>6</sub>, "H", <sub>4</sub>, "OMe", <sup>-</sup>],
            ["PCl", <sub>3</sub>]
          ],
          weights: [
            [
              // Cl-
              0.0002509238,
              0.0038089454,
              0.0031077329,
              0.0039693626,
              -0.0149363509,
              -0.0163124692
            ],
            [
              // H2O
              0.000049156,
              -0.0070359031,
              0.0004437931,
              0.0125666712,
              0.0151204168,
              -0.0207641867
            ],
            [
              // H-
              0.0001486995,
              -0.0030741939,
              0.0003645779,
              -0.0070594438,
              -0.0015272163,
              -0.0096336878
            ],
            [
              // O2-
              0.000142973,
              0.0007487861,
              -0.0028223532,
              0.002815909,
              -0.0007336813,
              0.0049838179
            ],
            [
              // C6H4OMe−
              0.0002210716,
              0.0006880377,
              0.0023786455,
              -0.0037573136,
              0.0170585379,
              0.0165954339
            ],
            [
              // PCl3
              0.0000181149,
              -0.0034813971,
              0.0020768228,
              0.0022057261,
              -0.0177574977,
              0.0078198948
            ],
            [
              // independent term
              0.0046719629,
              -0.0599381822,
              0.0777534936,
              -0.133184439,
              0.3482715799,
              0.1282810294
            ]
          ]
        }
      }
    };
    this._defaultMedium = "vacuum";
    this._defaultCompoundType = "ligand";
    const _length = this.media[this._defaultMedium][this._defaultCompoundType]
      .header.length;
    this.state = {
      medium: this._defaultMedium,
      compoundType: this._defaultCompoundType,
      rows: [Array(_length).fill("")],
      infoDialog: false
    };
  }
  filledRows() {
    let rowsOK = [];
    for (let i = 0; i < this.state.rows.length; i++) {
      let row = this.state.rows[i];
      let OK = true;
      for (let j = 0; j < row.length; j++) {
        let cell = row[j];
        if ((j && !this.validateQuantity(cell)) || !this.validateName(cell)) {
          OK = false;
          break;
        }
      }
      if (OK) {
        rowsOK.push(i);
      }
    }
    return rowsOK;
  }
  validateQuantity(value) {
    return (
      this.validateName(value) && !isNaN(parseFloat(value)) && isFinite(value)
    );
  }
  validateName(value) {
    return value !== undefined && value !== null && value.length > 0;
  }
  handleAddRow() {
    let rows = this.state.rows.slice();
    rows.push(
      Array(
        this.media[this.state.medium][this.state.compoundType].header.length
      ).fill("")
    );
    this.setState({
      rows: rows
    });
  }
  handleRemoveRow(i) {
    const rows = this.state.rows;
    const newRows = rows.slice(0, i).concat(rows.slice(i + 1));
    this.setState({
      rows: newRows
    });
  }
  handleMediumChange(medium) {
    let rows = [
      Array(this.media[medium][this.state.compoundType].header.length).fill("")
    ];
    this.setState({
      medium: medium,
      rows: rows
    });
  }
  handleCompoundTypeChange(compoundType) {
    let rows = [
      Array(this.media[this.state.medium][compoundType].header.length).fill("")
    ];
    this.setState({
      compoundType: compoundType,
      rows: rows
    });
  }
  handleFieldInput(event) {
    let target = event.target;
    let rows = this.state.rows.slice();
    rows[target.dataset.x][target.dataset.y] = target.value;
    this.setState({
      rows: rows
    });
  }
  handleInfoDialog(event) {
    this.setState({
      infoDialog: !this.state.infoDialog
    });
  }
  render() {
    const classes = this.classes;
    const header = this.media[this.state.medium][this.state.compoundType]
      .header;
    const rows = this.state.rows.slice();

    let tableHeaders = [
      <TableCell key={0}>
        <Tooltip title="Add new row">
          <IconButton
            color="primary"
            onClick={() => this.handleAddRow()}
            aria-label="Add row"
          >
            <Add />
          </IconButton>
        </Tooltip>
      </TableCell>
    ];
    header.forEach((h, n) => {
      tableHeaders.push(<TableCell key={n + 1}>{h}</TableCell>);
    });

    let tableRows = [];
    rows.forEach((row, i) => {
      let tableCells = [
        <TableCell key={0}>
          <Tooltip title="Delete row">
            <IconButton
              onClick={() => this.handleRemoveRow(i)}
              aria-label="Delete row"
            >
              <Delete />
            </IconButton>
          </Tooltip>
        </TableCell>
      ];
      row.forEach((cell, j) => {
        let xy = { "data-x": i, "data-y": j };
        let errorState = j
          ? !this.validateQuantity(rows[i][j])
          : !this.validateName(rows[i][j]);
        let tooltip = j
          ? "Bond dissociation energy (in kcal/mol)"
          : "Compound name";
        tableCells.push(
          <TableCell key={j + 1}>
            <Tooltip title={tooltip}>
              <TextField
                inputProps={xy}
                onChange={e => this.handleFieldInput(e)}
                value={cell}
                error={errorState}
              />
            </Tooltip>
          </TableCell>
        );
      });
      tableRows.push(<TableRow key={i}>{tableCells}</TableRow>);
    });

    let resultCards = [];
    const rowsOK = this.filledRows();
    rowsOK.forEach((row, i) => {
      const name = this.state.rows[row][0];
      const energies = this.state.rows[row].slice(1);
      const medium = this.state.medium;
      const compoundType = this.state.compoundType;
      const weights = this.media[medium][compoundType].weights;
      const descriptors = computeDescriptors(energies, weights);
      resultCards.push(
        <Grid item xs={3} key={i}>
          <ResultCard
            classes={classes}
            name={name}
            medium={medium}
            compoundType={compoundType}
            descriptors={descriptors}
            style={null}
          />
        </Grid>
      );
    });
    let resultsGrid;
    if (resultCards.length) {
      resultsGrid = (
        <Grid container spacing={8}>
          {resultCards}
        </Grid>
      );
    }
    return (
      <div className={classes.layout}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h4" color="inherit" className={classes.grow}>
              BDE Matrix App
            </Typography>
            {this.state.medium === "water" ? (
              <Button color="secondary" disabled>
                Provisional data
              </Button>
            ) : null}
            <ConditionsMenu
              items={["Ligand", "Metal"]}
              labelName={"Compound Type"}
              onValueChange={e => this.handleCompoundTypeChange(e)}
              defaultValue={this.state.compoundType}
            />
            <ConditionsMenu
              items={["Vacuum", "Water"]}
              labelName={"Medium"}
              onValueChange={e => this.handleMediumChange(e)}
              defaultValue={this.state.medium}
            />
          </Toolbar>
        </AppBar>
        <Paper className={classes.paper}>
          <Table padding="dense" key={header.length}>
            <TableHead>
              <TableRow>{tableHeaders}</TableRow>
            </TableHead>
            <TableBody>{tableRows}</TableBody>
          </Table>
        </Paper>
        {resultsGrid}
        <Footer
          classes={classes}
          handleInfoDialog={e => this.handleInfoDialog(e)}
        />
        <InfoDialog
          open={this.state.infoDialog}
          onClose={e => this.handleInfoDialog(e)}
        />
      </div>
    );
  }
}

function ResultCard(props) {
  const { classes, name, descriptors, medium, compoundType } = props;
  let compoundTypeTitle =
    compoundType.charAt(0).toUpperCase() + compoundType.slice(1);
  let lis = [];
  for (let i = 0; i < descriptors.length; i++) {
    const descriptor = <code>{descriptors[i]}</code>;
    lis.push(
      <ListItem key={i} disableGutters>
        <ListItemText primary={descriptor} />
      </ListItem>
    );
  }
  return (
    <Card>
      <CardHeader
        avatar={
          <Tooltip title={compoundTypeTitle}>
            <Avatar aria-label={compoundType}>
              {compoundTypeTitle.charAt(0)}
            </Avatar>
          </Tooltip>
        }
        action={
          <Tooltip title="Copy">
            <IconButton
              onClick={() => {
                window.prompt("Press Ctrl+C (or Cmd+C)", descriptors.join(","));
              }}
            >
              <FileCopy />
            </IconButton>
          </Tooltip>
        }
        title={name}
        // subheader={compoundTypeTitle}
      />
      <CardContent>
        <Typography color="textSecondary">Descriptors for {medium}</Typography>
        <List>{lis}</List>
      </CardContent>
      <CardActions />
    </Card>
  );
}

class ConditionsMenu extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.labelName = props.labelName;
    this.state = {
      anchorEl: null,
      selected: props.defaultValue,
      items: props.items
    };
  }

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleValueChange = event => {
    let value = event.target.innerText.toLowerCase();
    this.props.onValueChange(value);
    this.handleClose();
    this.setState({
      selected: value
    });
  };

  render() {
    const { anchorEl, items } = this.state;
    let menuItems = [];
    items.forEach((item, i) => {
      menuItems.push(
        <MenuItem key={i} onClick={e => this.handleValueChange(e)}>
          {item}
        </MenuItem>
      );
    });
    return (
      <div>
        <Button
          aria-owns={anchorEl ? "simple-menu" : null}
          aria-haspopup="true"
          color="inherit"
          onClick={this.handleClick}
        >
          {this.labelName}: {this.state.selected}
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          {menuItems}
        </Menu>
      </div>
    );
  }
}

function SeparatorDot(props) {
  return <span className={props.className}>&middot;</span>;
}

function Footer(props) {
  loadCSS(
    "https://use.fontawesome.com/releases/v5.1.0/css/all.css",
    document.querySelector("#insertion-point-jss")
  );
  return (
    <div
      id="footer"
      className={classNames(props.classes.center, props.classes.footer)}
    >
      <Typography variant="body2">
        BDE Matrix App
        <SeparatorDot className={props.classes.separator} />
        <span onClick={props.handleInfoDialog} className={props.classes.link}>
          <Icon className={classNames(props.classes.icon, "fa fa-info")} />
          More info
        </span>
        <SeparatorDot className={props.classes.separator} />
        <a
          href="https://github.com/jaimergp/bde"
          target="_blank"
          rel="noopener noreferrer"
          className={props.classes.link}
        >
          <Icon className={classNames(props.classes.icon, "fa fa-book")} />
          Citation
        </a>
        <SeparatorDot className={props.classes.separator} />
        <a
          href="https://github.com/jaimergp"
          target="_blank"
          rel="noopener noreferrer"
          className={props.classes.link}
        >
          <Icon className={classNames(props.classes.icon, "fab fa-github")} />
          @jaimergp
        </a>
      </Typography>
    </div>
  );
}

function InfoDialog(props) {
  return (
    <Dialog
      open={props.open}
      onClose={props.onClose}
      scroll="paper"
      aria-labelledby="scroll-dialog-title"
    >
      <DialogTitle id="scroll-dialog-title">
        About the Bond Dissociation Energy Matrix
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
          dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
          consectetur ac, vestibulum at eros. Praesent commodo cursus magna, vel
          scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue
          laoreet rutrum faucibus dolor auctor. Aenean lacinia bibendum nulla
          sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl
          consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus
          auctor fringilla. Cras mattis consectetur purus sit amet fermentum.
          Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo
          risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo
          cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis
          lacus vel augue laoreet rutrum faucibus dolor auctor. Aenean lacinia
          bibendum nulla sed consectetur. Praesent commodo cursus magna, vel
          scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper
          nulla non metus auctor fringilla. Cras mattis consectetur purus sit
          amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget
          quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
          Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
          Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.
          Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus
          magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec
          ullamcorper nulla non metus auctor fringilla. Cras mattis consectetur
          purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in,
          egestas eget quam. Morbi leo risus, porta ac consectetur ac,
          vestibulum at eros. Praesent commodo cursus magna, vel scelerisque
          nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum
          faucibus dolor auctor. Aenean lacinia bibendum nulla sed consectetur.
          Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
          Donec sed odio dui. Donec ullamcorper nulla non metus auctor
          fringilla. Cras mattis consectetur purus sit amet fermentum. Cras
          justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo
          risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo
          cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis
          lacus vel augue laoreet rutrum faucibus dolor auctor. Aenean lacinia
          bibendum nulla sed consectetur. Praesent commodo cursus magna, vel
          scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper
          nulla non metus auctor fringilla. Cras mattis consectetur purus sit
          amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget
          quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
          Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
          Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.
          Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus
          magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec
          ullamcorper nulla non metus auctor fringilla.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose} color="primary">
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
}

const StyledApp = withStyles(styles)(App);
export default StyledApp;
