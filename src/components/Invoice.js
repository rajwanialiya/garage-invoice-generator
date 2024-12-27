import React, { useEffect } from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  pdf,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 20,
    fontFamily: "Helvetica",
    fontSize: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  subtitle: {
    fontSize: 14,
    marginTop: 10,
  },
  table: {
    marginTop: 20,
    border: "1px solid #000",
    borderRadius: 5,
    overflow: "hidden",
    marginBottom: 20,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#f4f4f4",
    padding: "10px",
    fontWeight: "bold",
    borderBottom: "1px solid #000",
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: "5px 10px",
    borderBottom: "1px solid #ccc",
  },
  tableCell: {
    flex: 1,
    textAlign: "center",
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: "5px 10px",
    fontWeight: "bold",
    borderTop: "1px solid #ccc",
  },
  footer: {
    marginTop: 20,
    textAlign: "center",
  },
  detailsSection: {
    marginTop: 30,
    borderTop: "1px solid #000",
    paddingTop: 10,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: "5px 10px",
  },
  detailLabel: {
    fontWeight: "bold",
    flex: 3,
  },
  detailValue: {
    flex: 1,
    textAlign: "center",
  },
  description: {
    marginBottom: 10,
    fontStyle: "italic",
  },
});

const Invoice = ({ data }) => {
  const tax = 0.1;
  const subtotal = data.sellingPrice;
  const taxAmount = (subtotal * tax).toFixed(2);
  const total = (subtotal * 1.1).toFixed(2);

  return (
    <Document>
      <Page style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>Garage Technologies, Inc.</Text>
          <Text style={styles.title}>Invoice</Text>
        </View>
        <View>
          <Text style={styles.subtitle}>
            {new Date().toLocaleDateString()} | Balance Due: $
            {subtotal.toFixed(2)}
          </Text>
        </View>

        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={[styles.tableCell, { flex: 3 }]}>Item</Text>
            <Text style={[styles.tableCell, { flex: 1 }]}>Quantity</Text>
            <Text style={[styles.tableCell, { flex: 1 }]}>Price</Text>
          </View>

          <View style={styles.tableRow}>
            <Text style={[styles.tableCell, { flex: 3 }]}>
              {data.listingTitle}
            </Text>
            <Text style={[styles.tableCell, { flex: 1 }]}>1</Text>
            <Text style={[styles.tableCell, { flex: 1 }]}>
              ${subtotal.toFixed(2)}
            </Text>
          </View>

          <View style={styles.totalRow}>
            <Text style={[styles.tableCell, { flex: 3 }]}>Subtotal</Text>
            <Text style={[styles.tableCell, { flex: 1 }]}>
              ${subtotal.toFixed(2)}
            </Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={[styles.tableCell, { flex: 3 }]}>Tax (10%)</Text>
            <Text style={[styles.tableCell, { flex: 1 }]}>${taxAmount}</Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={[styles.tableCell, { flex: 3 }]}>Total</Text>
            <Text style={[styles.tableCell, { flex: 1 }]}>${total}</Text>
          </View>
        </View>

        <View style={styles.detailsSection}>
          <Text style={styles.description}>{data.listingDescription}</Text>

          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Text style={[styles.tableCell, { flex: 3 }]}>Detail</Text>
              <Text style={[styles.tableCell, { flex: 1 }]}>Value</Text>
            </View>

            <View style={styles.tableRow}>
              <Text style={[styles.tableCell, { flex: 3 }]}>
                Four Wheel Drive
              </Text>
              <Text style={[styles.tableCell, { flex: 1 }]}>
                {data.isFourWheelDrive ? "Yes" : "No"}
              </Text>
            </View>

            <View style={styles.tableRow}>
              <Text style={[styles.tableCell, { flex: 3 }]}>Item Age</Text>
              <Text style={[styles.tableCell, { flex: 1 }]}>
                {data.itemAge}
              </Text>
            </View>

            <View style={styles.tableRow}>
              <Text style={[styles.tableCell, { flex: 3 }]}>Item Brand</Text>
              <Text style={[styles.tableCell, { flex: 1 }]}>
                {data.itemBrand}
              </Text>
            </View>

            <View style={styles.tableRow}>
              <Text style={[styles.tableCell, { flex: 3 }]}>Item Height</Text>
              <Text style={[styles.tableCell, { flex: 1 }]}>
                {data.itemHeight}
              </Text>
            </View>

            <View style={styles.tableRow}>
              <Text style={[styles.tableCell, { flex: 3 }]}>Item Length</Text>
              <Text style={[styles.tableCell, { flex: 1 }]}>
                {data.itemLength}
              </Text>
            </View>

            <View style={styles.tableRow}>
              <Text style={[styles.tableCell, { flex: 3 }]}>Item Weight</Text>
              <Text style={[styles.tableCell, { flex: 1 }]}>
                {data.itemWeight}
              </Text>
            </View>

            <View style={styles.tableRow}>
              <Text style={[styles.tableCell, { flex: 3 }]}>Item Width</Text>
              <Text style={[styles.tableCell, { flex: 1 }]}>
                {data.itemWidth}
              </Text>
            </View>

            <View style={styles.tableRow}>
              <Text style={[styles.tableCell, { flex: 3 }]}>
                Listing Status
              </Text>
              <Text style={[styles.tableCell, { flex: 1 }]}>
                {data.listingStatus === 0 ? "Active" : "Inactive"}
              </Text>
            </View>

            <View style={styles.tableRow}>
              <Text style={[styles.tableCell, { flex: 3 }]}>Listing Title</Text>
              <Text style={[styles.tableCell, { flex: 1 }]}>
                {data.listingTitle}
              </Text>
            </View>

            <View style={styles.tableRow}>
              <Text style={[styles.tableCell, { flex: 3 }]}>Mileage</Text>
              <Text style={[styles.tableCell, { flex: 1 }]}>
                {data.mileage}
              </Text>
            </View>

            <View style={styles.tableRow}>
              <Text style={[styles.tableCell, { flex: 3 }]}>Pump Size</Text>
              <Text style={[styles.tableCell, { flex: 1 }]}>
                {data.pumpSize}
              </Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default Invoice;
