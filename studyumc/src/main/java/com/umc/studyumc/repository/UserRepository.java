package com.umc.studyumc.repository;

import com.umc.studyumc.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {}
