import { IInputs, IOutputs } from "./generated/ManifestTypes";
import * as React from "react";

// ── Internal props interface ──────────────────────────────────────────────────
interface GovukButtonProps {
    text: string;
    href: string | undefined;
    disabled: boolean;
    isStartButton: boolean;
    name: string | undefined;
    value: string | undefined;
    className: string | undefined;
    onClick: () => void;
}

// ── Internal React component (not exported) ───────────────────────────────────
function GovukButton(props: GovukButtonProps): React.ReactElement {
    const classes = [
        "govuk-button",
        props.isStartButton ? "govuk-button--start" : null,
        props.className || null,
    ]
        .filter(Boolean)
        .join(" ");

    const startIcon: React.ReactElement | null = props.isStartButton
        ? React.createElement(
              "svg",
              {
                  className: "govuk-button__start-icon",
                  xmlns: "http://www.w3.org/2000/svg",
                  width: "17.5",
                  height: "19",
                  viewBox: "0 0 33 40",
                  "aria-hidden": "true",
                  focusable: "false",
              },
              React.createElement("path", {
                  fill: "currentColor",
                  d: "M0 0h13l20 20-20 20H0l20-20z",
              })
          )
        : null;

    if (props.href) {
        return React.createElement(
            "a",
            {
                href: props.href,
                role: "button",
                draggable: false,
                className: classes,
                onClick: (e: React.MouseEvent<HTMLAnchorElement>) => {
                    e.preventDefault();
                    props.onClick();
                },
            },
            props.text,
            startIcon
        );
    }

    return React.createElement(
        "button",
        {
            type: "button" as const,
            disabled: props.disabled,
            name: props.name,
            value: props.value,
            className: classes,
            "aria-disabled": props.disabled ? "true" : undefined,
            onClick: props.onClick,
            "data-module": "govuk-button",
        },
        props.text,
        startIcon
    );
}

// ── PCF Virtual Control ───────────────────────────────────────────────────────
export class ButtonControl
    implements ComponentFramework.ReactControl<IInputs, IOutputs>
{
    private _notifyOutputChanged!: () => void;
    private _submitting = false;

    public init(
        _context: ComponentFramework.Context<IInputs>,
        notifyOutputChanged: () => void,
        _state: ComponentFramework.Dictionary
    ): void {
        this._notifyOutputChanged = notifyOutputChanged;
    }

    public updateView(
        context: ComponentFramework.Context<IInputs>
    ): React.ReactElement {
        const p = context.parameters;
        const preventDoubleClick = p.preventDoubleClick.raw === true;

        const handleClick = (): void => {
            if (preventDoubleClick && this._submitting) return;
            if (preventDoubleClick) {
                this._submitting = true;
                setTimeout(() => {
                    this._submitting = false;
                }, 1000);
            }
            this._notifyOutputChanged();
        };

        return React.createElement(GovukButton, {
            text: p.text.raw ?? "",
            href: p.href.raw ?? undefined,
            disabled: p.disabled.raw === true,
            isStartButton: p.isStartButton.raw === true,
            name: p.name.raw ?? undefined,
            value: p.value.raw ?? undefined,
            className: p.className.raw ?? undefined,
            onClick: handleClick,
        });
    }

    public getOutputs(): IOutputs {
        return {};
    }

    public destroy(): void {
        // no-op
    }
}
