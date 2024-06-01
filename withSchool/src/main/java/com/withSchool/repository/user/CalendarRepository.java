package com.withSchool.repository.user;

import com.withSchool.entity.user.Calendar;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface CalendarRepository extends JpaRepository<Calendar,Long> {
    @Query("SELECT c FROM Calendar c WHERE c.user.userId = :userId")
    List<Calendar> findAllByUserId(@Param("userId")Long userId);

    @Query("SELECT c FROM Calendar c JOIN FETCH c.user WHERE c.calendarId = :calendarId")
    Optional<Calendar> findByIdAndFetchUserEagerly(@Param("calendarId") Long calendarId);


}
