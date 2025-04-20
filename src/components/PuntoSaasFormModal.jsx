import React, { useEffect, useState } from "react";
import Modal from "./Modal.jsx";
import PuntoSaasForm from "./PuntoSaasForm.jsx";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ hasError: true, error, errorInfo });
    console.error("Error caught in ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h2>Something went wrong.</h2>
          <details style={{ whiteSpace: "pre-wrap" }}>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo.componentStack}
          </details>
        </div>
      );
    }

    return this.props.children;
  }
}

export default function PuntoSaasFormModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    console.log("PuntoSaasFormModal mounted");
    const handler = () => setOpen(true);
    window.addEventListener("openPuntoSaasForm", handler);
    return () => window.removeEventListener("openPuntoSaasForm", handler);
  }, []);

  return (
    <ErrorBoundary>
      <Modal open={open} onClose={() => setOpen(false)}>
        <PuntoSaasForm />
      </Modal>
    </ErrorBoundary>
  );
}
