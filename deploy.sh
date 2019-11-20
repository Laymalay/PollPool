#!/bin/bash
SESSION=$USER

tmux -2 new-session -d -s $SESSION

tmux new-window -t $SESSION:1 -n 'Polls'
tmux split-window -h
tmux select-pane -t 0
tmux send-keys "cd polls_api; ./deploy.sh" C-m
tmux select-pane -t 1
tmux send-keys "cd ui; ./deploy.sh" C-m
tmux split-window -v
tmux resize-pane -D 40

tmux -2 attach-session -t $SESSION
