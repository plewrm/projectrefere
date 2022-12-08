import React, { useState, useEffect, useRef } from "react";
import EMPage from "../../../components/commans/EMPage";
import { withStyles } from "@material-ui/core/styles";
import {
  Paper,
  Box,
  Button,
  makeStyles,
  Grid,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
  FormHelperText,
  Menu,
  Tooltip
} from "@material-ui/core";
import {
  Chart,
  BarSeries,
  Title,
  ArgumentAxis,
  ValueAxis,
  Legend,

} from "@devexpress/dx-react-chart-material-ui";
import { Animation, Stack, EventTracker } from "@devexpress/dx-react-chart";
import { Typography } from "@material-ui/core";
import EMSelect from "../../../components/commans/EMDropdown";
import { find, findIndex } from "lodash";
import EMDatePicker from "../../../components/commans/EMDatePicker";
import { useFormik, Field, Formik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
 EMDoGetNetworkListForDashboardAndReportsAction,
  
} from "../../../redux/actions/EMAdminActions";
import {EMDoGetNetworkDashboardInfo,EMDoGetNetworkOrgGrpChnForNetworkAction} from"../../../redux/actions/EMNetworkAdminActions"
import moment from "moment";


const useStyles = makeStyles((theme) => ({
  Title: {
    textAlign: "center",
    fontWeight: "bolder",
    fontSize: "large",
  },
  circle: {
    width: "100px",
    height: "100px",
    lineHeight: "100px",
    borderRadius: "50%",
    fontSize: "30px",
    color: "#fff",
    textAlign: "center",
    background: "#000080",
    fontWeight: "bolder",
  },
  typography: {
    fontWeight: "bold",
    fontSize: "20px",
  },
  grid: {
    borderBlock: "5px solid #2F92D6",
    borderLeft: "5px solid #2F92D6",
    borderRight: "5px solid #2F92D6",
    borderRadius: "5px",
  },
}));

export default function EMPlatformDashboard(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [networkList, setNetworkList] = useState([]);
  const networkadminData = useSelector((state) => state.networkAdmin || {});
  const [invitationData, setInvitationData] = useState([]);
  const [groupStats,setgroupStats]=useState([])
  const [targetItem, setTargetItem] = useState(undefined)
  const [usageData, setUsageData] = useState();
  const myRef = useRef()
  const [anchorRef, setElRefs] = React.useState([]);
  const [open, setOpen] = useState(false)

  useEffect(() => {
    dispatch(EMDoGetNetworkOrgGrpChnForNetworkAction());
  }, []);

  useEffect(() => {
    if (networkadminData.dashboardDataNetwork) {
      setInvitationData(networkadminData.dashboardDataNetwork[0].invitation_performance_data);
      setgroupStats(networkadminData.dashboardDataNetwork[0].group_stats)

      const result = Object.entries(
        groupBy(networkadminData.dashboardDataNetwork[0].platform_usage_data, "month")
      ).map(([month, items]) => {
        const sum = { month, active_users: 0, invited_users: 0 };
        for (const item of items) {
          sum.active_users += item.active_users;
          sum.invited_users += item.invited_users;
        }
        return sum;
      });

      function groupBy(objectArray, property) {
        return objectArray.reduce((acc, obj) => {
          const key = obj[property];
          if (!acc[key]) {
            acc[key] = [];
          }

          acc[key].push(obj);
          return acc;
        }, {});
      }

      setUsageData(result);
    }
  }, [networkadminData]);

  
  useEffect(() => {
    let organizationsArray = [];
    let partnershipsArray = [];
    if (networkadminData && networkadminData.dashboardEntityList) {
      if (
        networkadminData.dashboardEntityList &&
        networkadminData.dashboardEntityList[0] &&
        networkadminData.dashboardEntityList[0].partnerships.length > 0
      ) {
        partnershipsArray = networkadminData.dashboardEntityList[0].partnerships.map(
          (part, index) => ({
            ...part,
            isPartnership: true,
            newId: index + 1,
          })
        );
      }

      let newIndex = partnershipsArray.length;
      organizationsArray =
      networkadminData.dashboardEntityList &&
      networkadminData.dashboardEntityList[0] &&
      networkadminData.dashboardEntityList[0].organizations.length > 0 &&
      networkadminData.dashboardEntityList[0].organizations.map((org, index) => ({
        ...org,
        isPartnership: false,
        newId: newIndex + index + 1,
      }));
      setNetworkList([...partnershipsArray, ...organizationsArray]);
    }
  }, [networkadminData]);

  const validationSchema = yup.object({
    startDate: yup.date("Enter valid date").required("start date is required"),
    endDate: yup
      .date("Enter valid date")
      .required("end date is required")
      .min(yup.ref("startDate"), "End Date Must be After Start Date")
      .test(
        "",
        "end date should not be greater than 1 year",
        (val, props) => {
          const expiryDate = moment(val);
          const enteredDate = moment(props.parent.startDate);
          const tmpExpiryDate = moment(enteredDate).add(365, "days");
  
          if (!tmpExpiryDate.isBefore(expiryDate)) {
            return true;
          }
        }
      ),
    selectedNetwork: yup
      .string("Please select the network")
      .required("Please select the network"),
  });

  let date = new Date();
  date.setMonth(date.getMonth() + 1);

  const formik = useFormik({
    initialValues: {
      startDate: new Date(),
      endDate: date,
      selectedNetwork: "",
    },
    validationSchema: validationSchema,
    onSubmit: (e) => {
      function formatDate(date) {
        var d = new Date(date),
          month = "" + (d.getMonth() + 1),
          day = "" + d.getDate(),
          year = d.getFullYear();

        if (month.length < 2) month = "0" + month;
        if (day.length < 2) day = "0" + day;

        return [year, month, day].join("-");
      }

      let result = networkList.find((obj) => {
        return obj.newId === formik.values.selectedNetwork;
      });

  

      let requiredData = {
        start_date: formatDate(formik.values.startDate),
        end_date: formatDate(formik.values.endDate),
        organizationOrPartnershipId: result && result.id,
        isPartnership: result && result.isPartnership,
      };
      dispatch(EMDoGetNetworkDashboardInfo({ requiredData: requiredData }));
    },
  });

    const ArgumentLabel = (props, index) => {
      
      const { text } = props

      props = {
        ...props,
        text:text.slice(0,3)
      }
      return (<>
    <Tooltip title={text}>
      <ArgumentAxis.Label {...props} />
      </Tooltip>         
      </>);
    };

  return (
    <EMPage title="Dashboard" style={{ padding: "2%" }}>
     <div className={classes.grid}>
        <Paper elevation={3} style={{ textAlign: "center", display: "flex" }}>
          <form
            onSubmit={formik.handleSubmit}
            style={{ width: "60%", padding: "1%", display: "inline-block" }}
          >
            <Grid
              container
              spacing={3}
              alignItems="center"
              justifyContent="center"
            >
              <Grid item md={3}  style={{marginBottom:"1%"}} >
                {/* <Typography style={{ fontWeight: "bolder", fontSize: "large" }}>
                  Choose time period
                </Typography> */}
                &nbsp;
                <EMDatePicker
                  label={"Start Date"}
                  id={"Start Date"}
                  value={formik.values.startDate}
                  onSelectDate={(date) => {
                    formik.setFieldValue("startDate", date);
                  }}
                  minDate={new Date("01/01/1960")}
                  error={
                    formik.touched.startDate && Boolean(formik.errors.startDate)
                  }
                  helperText={
                    formik.touched.startDate && formik.errors.startDate
                  }
                />
              </Grid>
              <Grid item md={3}  style={{marginBottom:"1%"}}>
                <div ></div>&nbsp;
                <EMDatePicker
                  label={"End Date"}
                  id={"End Date"}
                  value={formik.values.endDate}
                  onSelectDate={(date) => {
                    formik.setFieldValue("endDate", date);
                  }}
                  minDate={formik.values.startDate}
                  error={
                    formik.touched.endDate && Boolean(formik.errors.endDate)
                  }
                  helperText={formik.touched.endDate && formik.errors.endDate}
                />
              </Grid>
              <Grid item md={3} style={{}}>
               
                <FormControl fullWidth style={{ marginTop: "5.8%" }}>
                  <InputLabel id="select-network">Network</InputLabel>
                  <Select
                    labelId="select-network"
                    id="select-network"
                    value={formik.values.selectedNetwork}
                    label="Select Network"
                    error={
                      formik.errors.selectedNetwork &&
                      formik.touched.selectedNetwork
                        ? true
                        : false
                    }
                    // helperText={formik.touched.selectedNetwork && formik.errors.selectedNetwork}
                    onChange={(selected) => {
                      formik.setFieldValue(
                        "selectedNetwork",
                        selected.target.value
                      );
                      
                    }}
                  >
                    {networkList &&
                      networkList.length > 0 &&
                      networkList.map((network) => (
                        <MenuItem value={network.newId}>
                          {network.organization_name}
                          {network.partnership_name}
                        </MenuItem>
                      ))}
                  </Select>
                  <FormHelperText style={{ color: "red" }}>
                    {formik.errors.selectedNetwork &&
                    formik.touched.selectedNetwork
                      ? formik.errors.selectedNetwork
                      : ""}
                  </FormHelperText>
                </FormControl>
              </Grid>
              <Grid item md={3} style={{marginTop:"1.5%"}}>
                <Button type="submit" variant="contained" color="primary">
                  Apply
                </Button>
              </Grid>
            </Grid>
          </form>
          {networkadminData.dashboardDataNetwork ? (
            <Grid
              container
              spacing={3}
              justifyContent="flex-end"
              alignItems="center"
              style={{ width: "40%", padding: "1%" }}
            >
              <Grid item container md={6} alignItems="center">
                <Grid item md={4}>
                  <div className={classes.circle}>
                    {networkadminData.dashboardDataNetwork[0].org_groups}
                  </div>
                </Grid>
                <Grid item md={6}>
                  <Typography className={classes.typography}>
                    Network Groups
                  </Typography>
                </Grid>
              </Grid>
              <Grid item container md={6} alignItems="center">
                <Grid item md={4}>
                  <div className={classes.circle}>
                    {networkadminData.dashboardDataNetwork[0].org_channels}
                  </div>
                </Grid>
                <Grid item md={6}>
                  <Typography className={classes.typography}>
                    Network Channels
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          ) : null}
        </Paper>
        {invitationData.length > 0 ? (
          <Grid container spacing={1} style={{ paddingTop: "1%" }}>
            <Grid item md={6}>
              <Paper elevation={3}>
                <Typography
                  style={{
                    transform: "rotate(-90deg)",
                    position: "absolute",
                    fontWeight: "bolder",
                    fontSize: "large",
                    top: "70%",
                  }}
                >
                  No. of Users
                </Typography>
                <Chart data={invitationData} style={{ marginLeft: "10%" }}>
                  <ArgumentAxis labelComponent={ArgumentLabel}/>
                  <ValueAxis />

                  <BarSeries
                    valueField="users"
                    argumentField="invitation_count"
                  />
                  <Title text="Invitation Performance" />
                  <Animation />
                </Chart>
                <Typography
                  style={{
                    textAlign: "center",
                    fontWeight: "bolder",
                    fontSize: "large",
                  }}
                >
                  No. of Invitations Required To Join
                </Typography>
              </Paper>
            </Grid>
            <Grid item md={6}>
              <Paper elevation={3}>
                <Typography
                  style={{
                    transform: "rotate(-90deg)",
                    position: "absolute",
                    fontWeight: "bolder",
                    fontSize: "large",
                    top: "70%",
                  }}
                >
                  Users
                </Typography>
                <Chart data={usageData} style={{ marginLeft: "10%" }}>
                  <ArgumentAxis  labelComponent={ArgumentLabel}/>
                  <ValueAxis min={1} />

                  <BarSeries
                    name="Invited Users"
                    valueField="invited_users"
                    argumentField="month"
                    color="#2F92D6"
                  />
                  <BarSeries
                    name="Active Users"
                    valueField="active_users"
                    argumentField="month"
                    color="#000080"
                  />
                  <Animation />
                  <Legend position="right" />
                  <Title text="Platform Usage" className={classes.Title} />
                  <Stack />
                </Chart>
                <Typography
                  style={{
                    textAlign: "center",
                    fontWeight: "bolder",
                    fontSize: "large",
                  }}
                >
                  Month
                </Typography>
              </Paper>
            </Grid>
              <Grid item md={6}>
            <Paper elevation={3}>
                <Typography
                  style={{
                    transform: "rotate(-90deg)",
                    position: "absolute",
                    fontWeight: "bolder",
                    fontSize: "large",
                    top: "120%",
                  }}
                >
                  Users
                </Typography>
                <Chart data={groupStats} style={{ marginLeft: "10%" }}>
                  <ArgumentAxis labelComponent={ArgumentLabel} />
                  <ValueAxis />

                  <BarSeries
                    valueField="users"
                    argumentField="group_name"
                  />
                  <Title text="Group Stats" />
                  <Animation />
     
                </Chart>
                <Typography
                  style={{
                    textAlign: "center",
                    fontWeight: "bolder",
                    fontSize: "large",
                  }}
                >
               Group
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        ) : null}
      </div>
    </EMPage>
  );
}