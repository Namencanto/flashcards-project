import React from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

import { lightPurple, veryLightPurple } from "./colors";
const borderColor = lightPurple;
const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    borderBottomColor: veryLightPurple,
    borderBottomWidth: 1,
    alignItems: "center",
    height: 24,
    fontSize: 12,
    fontStyle: "bold",
  },
  description: {
    width: "60%",
    textAlign: "right",
    paddingRight: 8,
    borderRightColor: borderColor,
    borderRightWidth: 1,
  },
  total: {
    width: "15%",
    textAlign: "right",
    paddingRight: 8,
  },
  VATtotal: {
    width: "15%",
    textAlign: "right",
    paddingRight: 8,
    borderRightColor: borderColor,
    borderRightWidth: 1,
  },
  qtyTotal: {
    width: "10%",
    textAlign: "right",
    paddingRight: 8,
    borderRightColor: borderColor,
    borderRightWidth: 1,
  },
});

const InvoiceTableFooter = ({ items }) => {
  const total = items
    .map((item) => item.qty * item.rate)
    .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  return (
    <View style={styles.row}>
      <Text style={styles.description}>TOTAL</Text>
      <Text style={styles.qtyTotal}>{Number.parseFloat(items.length)}</Text>
      <Text style={styles.VATtotal}>
        {Number.parseFloat(total * 0.23).toFixed(2)}
      </Text>
      <Text style={styles.total}>{Number.parseFloat(total).toFixed(2)}</Text>
    </View>
  );
};

export default InvoiceTableFooter;
