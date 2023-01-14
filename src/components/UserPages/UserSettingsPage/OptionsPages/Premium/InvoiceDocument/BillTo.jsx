import React from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  headerContainer: {
    marginTop: 36,
  },
  billTo: {
    marginTop: 20,
    paddingBottom: 3,
    fontFamily: "Helvetica",
  },
});

const BillTo = ({ invoice }) => (
  <View style={styles.headerContainer}>
    <Text style={styles.billTo}>Bill To:</Text>
    <Text>{invoice.vatNumber}</Text>
    <Text>Payment method: {invoice.paymentMethod}</Text>
    <Text>{invoice.company}</Text>
    {invoice.address.includes("null") ? "" : <Text>invoice.address</Text>}
    <Text>{invoice.email}</Text>
  </View>
);

export default BillTo;
