// @@@ MATERIAL-UI @@@
import { Box, Grid, Typography, Button, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { DataGrid, GridToolbar } from '@material-ui/data-grid';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
// @@@ MATERIAL-UI @@@

// @@@ nextjs @@@
import Link from 'next/link';
import DashboardLeft from '../../../components/dashboard/DashboardLeft';
import { connectToDatabase } from '../../../util/mongodb';
// @@@ nextjs @@@

export const getStaticProps = async () => {
  const { db } = await connectToDatabase();

  const getCategories = await db.collection('categories').find().toArray();
  const categories = await JSON.parse(JSON.stringify(getCategories));

  return {
    props: {
      categories,
    },
  };
};

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'category_id',
    headerName: 'Category_ID',
    width: 220,
  },
  { field: 'name', headerName: 'Name', width: 200 },
  {
    field: 'edit',
    headerName: 'Edit',
    width: 160,
    renderCell: (params) => (
      <Link href={`/dashboard/categories/edit-category?id=${params.value}`}>
        <a>
          <IconButton>
            <EditIcon color='primary' />
          </IconButton>
        </a>
      </Link>
    ),
  },
];

const useStyles = makeStyles((theme) => ({
  gridContainer: {
    height: '100vh',
    position: 'relative',
  },
  dataGridWrapper: {
    height: 500,
    width: '100%',
    border: '1px solid rgba(86,82,222,0.2)',
    borderRadius: '5px',
    boxShadow: theme.shadows[1],
    marginTop: theme.spacing(25),
  },
  modalBox: {
    position: 'fixed',
    width: '100%',
    height: '100vh',
    backgroundColor: 'rgba(33,33,33,0.5)',
    zIndex: 99,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalWrapper: {
    backgroundColor: '#fafafa',
    borderRadius: '5px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(5),
    paddingLeft: theme.spacing(5),
    paddingRight: theme.spacing(5),
    boxShadow: '2px 2px 10px 1px rgba(0,0,0,0.5)',
  },
  modalItemContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalGridItem: {
    padding: theme.spacing(1),
    marginBottom: theme.spacing(3),
  },
  modalBtnWrapper: {
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
  },
  modalBtn: {
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  modalCancel: {
    marginRight: theme.spacing(3),
  },
  modalDelete: {
    backgroundColor: '#F44336',
    color: '#f6f6f6',
    '&:hover': {
      backgroundColor: '#F11336',
      color: '#f6f6f6',
    },
  },
}));

const Categories = ({ categories }) => {
  const classes = useStyles();

  let dataGridRows = [];
  if (categories) {
    for (let x in categories) {
      let newProductRow = {
        id: x,
        category_id: categories[x]._id,
        name: categories[x].name,
        edit: categories[x]._id,
      };

      dataGridRows.push(newProductRow);
    }
  }

  const modal = (
    <Box component='div' className={classes.modalBox}>
      <Box component='div' className={classes.modalWrapper}>
        <div className={classes.modalItemContainer}>
          <Grid item md={12} className={classes.modalGridItem}>
            <DeleteIcon
              fontSize='large'
              style={{ color: '#F44336', fontSize: '60px' }}
            />
          </Grid>
          <Grid item md={12} className={classes.modalGridItem}>
            <Typography variant='h5' color='textPrimary'>
              Are you sure ?
            </Typography>
          </Grid>
          <Grid item md={12} className={classes.modalGridItem}>
            <Typography variant='body2' color='textSecondary' align='center'>
              Do you really would like to delete this product ? <br /> This
              cannot be undone.
            </Typography>
          </Grid>
          <Grid
            item
            md={12}
            className={`${classes.modalGridItem} ${classes.modalBtnWrapper}`}
          >
            <Button
              disableElevation
              variant='contained'
              className={`${classes.modalBtn} ${classes.modalCancel}`}
            >
              CANCEL
            </Button>
            <Button
              disableElevation
              variant='contained'
              className={`${classes.modalBtn} ${classes.modalDelete}`}
            >
              DELETE
            </Button>
          </Grid>
        </div>
      </Box>
    </Box>
  );

  return (
    <>
      <Box component='div'>
        <Grid container>
          <Grid item md={2}>
            <DashboardLeft></DashboardLeft>
          </Grid>
          <Grid item md={9} className={classes.gridContainer}>
            <div className={classes.dataGridWrapper}>
              <DataGrid
                rows={dataGridRows}
                columns={columns}
                pageSize={5}
                components={{ Toolbar: GridToolbar }}
              />
            </div>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Categories;
