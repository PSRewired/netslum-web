'use client';

import { Button, Modal, ProgressBar, Spinner } from 'react-bootstrap';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useServerApi } from '@/hooks/useServerApi.js';
import { MdCheckCircle, MdError } from 'react-icons/md';

const CLAIM_DURATION_MS = 10 * 60 * 1000;
const POLL_INTERVAL_MS = 3000;

function formatRemaining(ms) {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

export default function ClaimAreaServerModal({ show, onHide }) {
  const apiClient = useServerApi();
  const queryClient = useQueryClient();

  const [code, setCode] = useState(null);
  const [expiresAt, setExpiresAt] = useState(null);
  const [now, setNow] = useState(() => Date.now());
  const [claimed, setClaimed] = useState(false);
  const [createError, setCreateError] = useState(null);

  const remainingMs = expiresAt ? expiresAt - now : 0;
  const expired = expiresAt !== null && remainingMs <= 0 && !claimed;

  const createClaimMutation = useMutation({
    mutationFn: async () => (await apiClient.createAreaServerClaimCode())?.data,
    onSuccess: async (data) => {
      const newCode = data?.code ?? data?.claimCode ?? data;
      setCode(newCode);
      setExpiresAt(Date.now() + CLAIM_DURATION_MS);
      setNow(Date.now());
      setClaimed(false);
      setCreateError(null);
    },
    onError: (error) => {
      console.error(error);
      setCreateError(error);
    },
  });

  const shouldPoll = Boolean(code) && !claimed && !expired;

  const apiClientRef = useRef(apiClient);
  apiClientRef.current = apiClient;

  useEffect(() => {
    if (!shouldPoll || !code) return undefined;

    let cancelled = false;

    const pollOnce = async () => {
      try {
        const { data } =
          await apiClientRef.current.getAreaServerClaimCodeStatus(code);
        if (cancelled) return;
        if (data?.claimed) {
          setClaimed(true);
        }
      } catch (err) {
        console.error(err);
      }
    };

    pollOnce();
    const id = setInterval(pollOnce, POLL_INTERVAL_MS);

    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, [shouldPoll, code]);

  useEffect(() => {
    if (!expiresAt || claimed) return undefined;
    const id = setInterval(() => setNow(Date.now()), 250);
    return () => clearInterval(id);
  }, [expiresAt, claimed]);

  const triggeredRef = useRef(false);
  const createMutateRef = useRef(createClaimMutation.mutate);
  createMutateRef.current = createClaimMutation.mutate;

  useEffect(() => {
    if (!show) {
      triggeredRef.current = false;
      return;
    }
    if (!triggeredRef.current && !code) {
      triggeredRef.current = true;
      createMutateRef.current();
    }
  }, [show, code]);

  const resetState = useCallback(() => {
    setCode(null);
    setExpiresAt(null);
    setClaimed(false);
    setCreateError(null);
    triggeredRef.current = false;
  }, []);

  const handleClose = useCallback(async () => {
    resetState();
    onHide?.();
    await queryClient.invalidateQueries({queryKey: ['user-area-server-associations']})
  }, [onHide, resetState, queryClient]);

  const handleRetry = useCallback(() => {
    resetState();
  }, [resetState]);

  const progressPct = useMemo(() => {
    if (!expiresAt) return 100;
    return Math.max(0, Math.min(100, (remainingMs / CLAIM_DURATION_MS) * 100));
  }, [expiresAt, remainingMs]);

  const progressVariant =
    progressPct > 50 ? 'success' : progressPct > 20 ? 'warning' : 'danger';

  return (
    <Modal show={show} onHide={handleClose} centered backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>Claim Area Server</Modal.Title>
      </Modal.Header>
      <Modal.Body className="d-flex flex-column gap-3 align-items-center text-center py-4">
        {createClaimMutation.isPending && !code && (
          <>
            <Spinner animation="border" role="status" />
            <div>Generating claim code…</div>
          </>
        )}

        {createError && !code && (
          <>
            <MdError size={56} className="text-danger" />
            <div className="fw-bold">Failed to generate claim code</div>
            <Button variant="primary" onClick={handleRetry}>
              Try Again
            </Button>
          </>
        )}

        {code && claimed && (
          <>
            <MdCheckCircle size={72} className="text-success" />
            <h4 className="mb-0 text-success">Area server claimed!</h4>
            <div className="text-muted">
              Your area server has been successfully linked to your account.
            </div>
          </>
        )}

        {code && !claimed && expired && (
          <>
            <MdError size={72} className="text-danger" />
            <h4 className="mb-0 text-danger">Claim code expired</h4>
            <div className="text-muted">
              This claim code is no longer valid. Generate a new one to try
              again.
            </div>
            <Button variant="primary" onClick={handleRetry}>
              Generate New Code
            </Button>
          </>
        )}

        {code && !claimed && !expired && (
          <>
            <div className="text-muted">
              Edit the name of your Area Server and append the following code to
              the name of your server (Ex: My Server $123456) and publish it.
              Once the claim process is completed, you may remove this code from
              your Area Server name.
            </div>
            <div
              className="px-4 py-3 rounded border bg-secondary bg-opacity-10 font-monospace"
              style={{ fontSize: '2rem', letterSpacing: '0.25rem' }}
            >
              #{code}
            </div>
            <div className="w-100">
              <div className="d-flex justify-content-between small text-muted mb-1">
                <span>Time remaining</span>
                <span className="font-monospace">
                  {formatRemaining(remainingMs)}
                </span>
              </div>
              <ProgressBar
                now={progressPct}
                variant={progressVariant}
                animated
              />
            </div>
            <div className="d-flex align-items-center gap-2 text-muted small">
              <Spinner animation="border" size="sm" />
              Waiting for claim…
            </div>
          </>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
