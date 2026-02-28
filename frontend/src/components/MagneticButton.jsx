import { useState, useEffect, useRef, useCallback } from 'react';

const MagneticButton = ({
  children,
  padding = 100,               // still used for movement range, but only when hovered
  disabled = false,
  magnetStrength = 2,
  activeTransition = 'transform 0.3s ease-out',
  inactiveTransition = 'transform 0.5s ease-in-out',
  wrapperClassName = '',
  innerClassName = '',
  ...props
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const wrapperRef = useRef(null);
  
  // Keep latest props in a ref to avoid stale closures in mousemove handler
  const propsRef = useRef({ padding, disabled, magnetStrength });
  useEffect(() => {
    propsRef.current = { padding, disabled, magnetStrength };
  }, [padding, disabled, magnetStrength]);

  const handleMouseMove = useCallback((e) => {
    const { padding, disabled, magnetStrength } = propsRef.current;
    if (disabled || !wrapperRef.current) return;

    const { left, top, width, height } = wrapperRef.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    // Calculate offset based on mouse position relative to center
    const offsetX = (e.clientX - centerX) / magnetStrength;
    const offsetY = (e.clientY - centerY) / magnetStrength;

    // Optional: clamp movement within padding? Usually we just move within the element.
    // But we can use padding to limit how far it can go.
    // Here we keep the same logic as before: move without clamping.
    setPosition({ x: offsetX, y: offsetY });
  }, []);

  // Attach/remove mousemove based on hover state
  useEffect(() => {
    if (disabled || !isHovered) {
      // If not hovered, ensure position resets and no listener
      setPosition({ x: 0, y: 0 });
      return;
    }

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isHovered, disabled, handleMouseMove]);

  // Reset position when hover ends (already done in the effect above, but explicit for clarity)
  useEffect(() => {
    if (!isHovered) {
      setPosition({ x: 0, y: 0 });
    }
  }, [isHovered]);

  const transitionStyle = isHovered ? activeTransition : inactiveTransition;

  return (
    <div
      ref={wrapperRef}
      className={wrapperClassName}
      style={{ position: 'relative', display: 'inline-block' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      <div
        className={innerClassName}
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
          transition: transitionStyle,
          willChange: 'transform',
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default MagneticButton;