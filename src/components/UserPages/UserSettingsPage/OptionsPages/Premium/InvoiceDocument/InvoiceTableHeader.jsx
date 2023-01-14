import React from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

import { veryLightPurple, purple } from "./colors";
const borderColor = purple;
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderBottomColor: veryLightPurple,
    backgroundColor: veryLightPurple,
    borderBottomWidth: 1,
    alignItems: "center",
    height: 24,
    textAlign: "center",
    fontStyle: "bold",
    flexGrow: 1,
  },
  description: {
    color: "#fff",
    width: "60%",
    borderRightColor: borderColor,
    borderRightWidth: 1,
  },
  qty: {
    color: "#fff",
    width: "10%",
    borderRightColor: borderColor,
    borderRightWidth: 1,
  },
  rate: {
    color: "#fff",
    width: "15%",
    borderRightColor: borderColor,
    borderRightWidth: 1,
  },
  amount: { color: "#fff", width: "15%" },
});

const InvoiceTableHeader = () => (
  <View style={styles.container}>
    <Text style={styles.description}>Item Description</Text>
    <Text style={styles.qty}>Qty</Text>
    <Text style={styles.rate}>@</Text>
    <Text style={styles.amount}>Amount</Text>
  </View>
);

export default InvoiceTableHeader;
