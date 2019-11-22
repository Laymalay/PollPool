#!/bin/bash
SESSION=$USER

tmux -2 new-session -d -s $SESSION

tmux new-window -t $SESSION:1 -n 'Polls'
tmux split-window -h
tmux select-pane -t 0
tmux send-keys "cd polls_api; ./deploy.sh" C-m
tmux select-pane -t 1
tmux resize-pane -L 30
tmux send-keys "cd ui; ./deploy.sh" C-m
tmux split-window -v
tmux resize-pane -U 30


tmux -2 attach-session -t $SESSION
