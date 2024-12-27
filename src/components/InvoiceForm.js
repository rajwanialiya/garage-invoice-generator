import React, { useState } from "react";
import "./InvoiceForm.css";
import Invoice from "./Invoice";
import { PDFDownloadLink } from "@react-pdf/renderer";

const InvoiceForm = () => {
  const [link, setLink] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [invoiceData, setInvoiceData] = useState("");

  React.useEffect(() => {}, [invoiceData]);

  const getListingEndpoint = "https://garage-backend.onrender.com/getListing";
  const errors = {
    emptyLink: "This field cannot be empty.",
    invalidLink: "Please enter a valid Garage listing link.",
    failedGet: "Unable to get listing.",
    invalidListingId:
      "Unable to get listing, please ensure the listing link is valid.",
  };

  // helpers
  const isValidGarageLink = (link) => {
    const prefix = /^(https?:\/\/)?www\.withgarage\.com\/listing\//;
    return prefix.test(link);
  };

  const extractListingUuid = (link) => {
    const listingUuidMatch = link.match(
      /(?:https?:\/\/)?www\.withgarage\.com\/listing\/.+-([a-f0-9\-]{36})$/
    );

    if (listingUuidMatch && listingUuidMatch[1]) {
      return listingUuidMatch[1];
    }
    return "";
  };

  const getListing = async (listingId) => {
    const reqBody = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: listingId }),
    };

    const response = await fetch(getListingEndpoint, reqBody);
    const data = await response.json();

    if (!response.ok || data.error) {
      return { data: null, err: data.error || errors.failedGet };
    }

    if (!data.result || !data.result.listing) {
      return { data: null, err: errors.invalidListingId };
    }

    return { data: data.result.listing, err: "" };
  };

  const generatePdfInvoice = async (data) => {
    if (data) {
      setInvoiceData(data);
    }
  };

  const handleSubmit = async () => {
    console.log("hi");
    setError("");
    setInvoiceData("");
    setIsLoading(true);

    // verify form input
    let trimmedLink = link.trim();
    if (trimmedLink == "") {
      setError(errors.emptyLink);
      return;
    } else if (!isValidGarageLink(trimmedLink)) {
      setError(errors.invalidLink);
      return;
    }

    // get listing uuid from input
    let listingId = extractListingUuid(trimmedLink);
    if (listingId == "") {
      setError(errors.invalidLink);
      return;
    }

    // get listing
    const { data, err } = await getListing(listingId);
    if (err) {
      setError(err);
      return;
    }

    await generatePdfInvoice(data);
    setIsLoading(false);
  };

  return (
    <div className="invoice-form">
      <h1>Fire Truck Invoice Generator</h1>
      <p>Enter the listing link below to generate a PDF invoice.</p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        {error && (
          <div className="error-message">
            <span className="error-text">{error}</span>
          </div>
        )}
        <input
          type="text"
          value={link}
          onChange={(e) => {
            setError("");
            setLink(e.target.value);
          }}
          id="input-box"
          placeholder="Paste link here"
        />
        <button type="submit" className="generate">
          Generate Invoice
        </button>
        {invoiceData && (
          <PDFDownloadLink
            className="download-link"
            document={<Invoice data={invoiceData} />}
            fileName="invoice.pdf"
          >
            {({ loading }) =>
              loading ? "Loading document..." : "Download Invoice"
            }
          </PDFDownloadLink>
        )}
      </form>
    </div>
  );
};

export default InvoiceForm;
