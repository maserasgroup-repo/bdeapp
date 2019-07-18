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
            ["OsO", <sub>3</sub>, <sup>2+</sup>],
            ["PdH(PH", <sub>3</sub>, ")", <sup>2</sup>],
            ["PdPH", <sub>3</sub>],
            ["ZrCl", <sub>5</sub>, <sup>-</sup>],
            ["InCl", <sub>2</sub>, <sup>+</sup>]
          ],
          weights: [
            [
              // Os
              -0.0005398027997,
              -0.001008778459,
              -0.007102976934,
              0.007269303107,
              0.01065421284
            ],
            [
              // Pd2
              -0.001379744686,
              0.01618136365,
              0.01436456376,
              0.02502075905,
              -0.009982100498
            ],
            [
              // Pd
              -0.0001035719918,
              -0.0008670113451,
              0.003048754203,
              -0.01594350917,
              0.01987464452
            ],
            [
              // ZrCl
              -0.0006353303889,
              -0.006948386026,
              0.01392862796,
              -0.004024313711,
              0.003225233558
            ],
            [
              // HgI
              -0.0006665434467,
              -0.003050189204,
              -0.001183880256,
              -0.01417962593,
              -0.02235886602
            ],
            [
              // independent term
              0.004922340541,
              -0.09469619912,
              0.08169097421,
              0.04952947717,
              -0.1342343762
            ]
          ]
        },
        metal: {
          header: [
            "Your metallic cofactor(s)",
            "CO",
            ["F", <sup>-</sup>],
            ["C", <sub>6</sub>, "H", <sub>5</sub>, <sup>-</sup>],
            ["O", <sup>2-</sup>],
            ["SH", <sup>-</sup>]
          ],
          weights: [
            [
              // CO
              0.0001730012506,
              -0.004722494466,
              -0.003855761259,
              0.01405492919,
              -0.01476618754
            ],
            [
              // F
              0.0001707747767,
              0.001068338938,
              -0.001807039906,
              0.02001656414,
              0.02692567844
            ],
            [
              // C6H5-
              0.001185265395,
              -0.006218403748,
              -0.009396658411,
              -0.01200341089,
              0.01090905964
            ],
            [
              // O2-
              0.0003063074413,
              0.004092470414,
              -0.002038683663,
              -0.0009146018191,
              -0.01225933845
            ],
            [
              // SH-
              0.000731743154,
              0.0004008745758,
              0.02409137051,
              0.001918599294,
              -0.01379218568
            ],
            [
              // independent term
              -0.0004590181831,
              -0.0365872177,
              0.04698976863,
              0.1049615174,
              -0.1054673085
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
          href="https://pubs.acs.org/doi/abs/10.1021/acs.inorgchem.8b02372"
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
          A statistical treatment of the DFT-computed heterolytic bond dissociation energies (BDE) between a diverse variety of metal fragments and ligands leads to the identification of five hidden descriptors that best characterize the bonding ability per moiety, and of a simple mathematical formula able to obtain from these hidden descriptors a BDE estimation within a few kcal/mol from the DFT value. A simple extension of this treatment beyond the original set of metal fragments and ligands is also presented. The first two hidden descriptors can be associated with the well-known concepts of σ-donation and π-effects, with the next two associated with cis influence and degree of covalency. The procedure can be easily extended to additional ligands and metal fragments, and it opens the way to an improved understanding of fundamental concepts of chemical bonding. <a href="https://pubs.acs.org/doi/full/10.1021/acs.inorgchem.8b02372" target="_blank">Read the article</a>.
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
