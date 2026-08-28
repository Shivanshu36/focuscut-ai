import { createFileRoute } from "@tanstack/react-router";
import { ToolWorkspace } from "@/components/tool/ToolWorkspace";

export const Route = createFileRoute("/remove-background")({
  head: () => ({
    meta: [
      { title: "Remove Background – SnapCut AI" },
      {
        name: "description",
        content:
          "Upload an image and remove its background instantly with AI. Download a transparent PNG or a JPG with any background colour.",
      },
      { property: "og:title", content: "Remove Background – SnapCut AI" },
      {
        property: "og:description",
        content: "AI background removal in seconds. Transparent PNG and JPG downloads.",
      },
    ],
  }),
  component: RemoveBackgroundPage,
});

function RemoveBackgroundPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-extrabold sm:text-4xl">
          Remove <span className="text-gradient-brand">Background</span>
        </h1>
        <p className="mt-3 text-muted-foreground">
          Upload an image, let the AI do the cutting, then download your result.
        </p>
      </header>
      <ToolWorkspace />
    </div>
  );
}
