import { Card, Settings, SystemAudio, Updater, GlassSettings } from "./components";
import { Completion } from "./components/completion";
import { ChatHistory } from "./components/history";
import { AudioVisualizer } from "./components/speech/audio-visualizer";
import { StatusIndicator } from "./components/speech/StatusIndicator";
import { useSystemAudio } from "./hooks/useSystemAudio";

const App = () => {
  const systemAudio = useSystemAudio();

  const handleSelectConversation = (conversation: any) => {
    // Use localStorage to communicate the selected conversation to Completion component
    localStorage.setItem("selectedConversation", JSON.stringify(conversation));
    // Trigger a custom event to notify Completion component
    window.dispatchEvent(
      new CustomEvent("conversationSelected", {
        detail: conversation,
      })
    );
  };

  const handleNewConversation = () => {
    // Clear any selected conversation and trigger new conversation
    localStorage.removeItem("selectedConversation");
    window.dispatchEvent(new CustomEvent("newConversation"));
  };

  return (
    <div className="w-screen h-screen flex overflow-hidden justify-center items-start">
      <Card className="glass w-full flex flex-row items-center gap-2 p-2 relative">
        <div
          data-tauri-drag-region
          style={{ height: 24, borderBottom: "1px solid rgba(255,255,255,.1)" }}
        />
        <div className="glass-nodrag flex w-full flex-row items-center gap-2 p-2">
          <div className="glass-nodrag">
            <SystemAudio {...systemAudio} />
          </div>
          {systemAudio?.capturing ? (
            <div className="glass-nodrag flex flex-row items-center gap-2 justify-between w-full">
              <div className="flex flex-1 items-center gap-2">
                <AudioVisualizer isRecording={systemAudio?.capturing} />
              </div>
              <div className="flex !w-fit items-center gap-2">
                <StatusIndicator
                  setupRequired={systemAudio.setupRequired}
                  error={systemAudio.error}
                  isProcessing={systemAudio.isProcessing}
                  isAIProcessing={systemAudio.isAIProcessing}
                  capturing={systemAudio.capturing}
                />
              </div>
            </div>
          ) : null}

          <div
            className={`${
              systemAudio?.capturing
                ? "hidden w-full fade-out transition-all duration-300"
                : "w-full flex flex-row gap-2 items-center"
            } glass-nodrag`}
          >
            <Completion />
            <ChatHistory
              onSelectConversation={handleSelectConversation}
              onNewConversation={handleNewConversation}
              currentConversationId={null}
            />
            <Settings />
            <GlassSettings />
          </div>

          <div className="glass-nodrag">
            <Updater />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default App;
