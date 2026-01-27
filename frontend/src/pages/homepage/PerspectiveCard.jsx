import React, { useRef, useEffect } from "react";

function PerspectiveCard({
  children,
  className = "",
  enableTilt = true,
  maxRotate = 12,
  defaultRotateX = 0,
  defaultRotateY = 0,
  defaultTranslateZ = 0,
  defaultScale = 1,
}) {
  const innerRef = useRef(null);
  const wrapperRef = useRef(null);

  const baseTransform = `rotateX(${defaultRotateX}deg) rotateY(${defaultRotateY}deg) translateZ(${defaultTranslateZ}px) scale(${defaultScale})`;

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const inner = innerRef.current;
    if (!inner || !wrapper) return;

    inner.style.transform = baseTransform;
    inner.style.transformStyle = "preserve-3d";
    inner.style.willChange = "transform";

    if (!enableTilt) return;

    let rafId = null;

    function onMove(e) {
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      const rect = wrapper.getBoundingClientRect();
      const px = (clientX - rect.left) / rect.width;
      const py = (clientY - rect.top) / rect.height;

      const deltaY = (px - 0.5) * 2 * maxRotate;
      const deltaX = (0.5 - py) * 2 * maxRotate;

      const combinedRotateX = defaultRotateX + deltaX;
      const combinedRotateY = defaultRotateY + deltaY;

      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        inner.style.transform = `rotateX(${combinedRotateX}deg) rotateY(${combinedRotateY}deg) translateZ(${defaultTranslateZ}px) scale(${defaultScale})`;
      });
    }

    function onLeave() {
      if (rafId) cancelAnimationFrame(rafId);
      inner.style.transition = "transform 500ms cubic-bezier(.2,.9,.2,1)";
      inner.style.transform = baseTransform;
      setTimeout(() => {
        if (inner) inner.style.transition = "";
      }, 500);
    }

    wrapper.addEventListener("mousemove", onMove);
    wrapper.addEventListener("touchmove", onMove, { passive: true });
    wrapper.addEventListener("mouseleave", onLeave);
    wrapper.addEventListener("touchend", onLeave);

    return () => {
      wrapper.removeEventListener("mousemove", onMove);
      wrapper.removeEventListener("touchmove", onMove);
      wrapper.removeEventListener("mouseleave", onLeave);
      wrapper.removeEventListener("touchend", onLeave);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [enableTilt, maxRotate, defaultRotateX, defaultRotateY, defaultTranslateZ, defaultScale, baseTransform]);

  const initialStyle = {
    transform: baseTransform,
    transition: "transform 350ms cubic-bezier(.2,.9,.2,1)",
  };

  return (
    <div ref={wrapperRef} className={`perspective ${className}`} aria-hidden={false}>
      <div ref={innerRef} className="card-inner transform-gpu will-change-transform" style={initialStyle}>
        {children}
      </div>
    </div>
  );
}

export default PerspectiveCard;
